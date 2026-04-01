import requests
import sys
from datetime import datetime

class BlogAPITester:
    def __init__(self, base_url="https://jovial-wright-4.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response structure if expected_keys provided
                if expected_keys:
                    try:
                        response_data = response.json()
                        for key in expected_keys:
                            if key not in response_data:
                                print(f"⚠️  Warning: Expected key '{key}' not found in response")
                            else:
                                print(f"   ✓ Found key: {key}")
                    except Exception as e:
                        print(f"   ⚠️  Could not parse JSON response: {e}")
                
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200,
            expected_keys=["message"]
        )

    def test_get_blog_posts_default(self):
        """Test getting blog posts with default pagination"""
        success, response = self.run_test(
            "Get Blog Posts (Default)",
            "GET",
            "api/posts",
            200,
            expected_keys=["posts", "total", "page", "per_page", "total_pages"]
        )
        
        if success:
            posts = response.get('posts', [])
            print(f"   📊 Found {len(posts)} posts")
            print(f"   📄 Total pages: {response.get('total_pages', 0)}")
            
            # Verify we have the expected 4 posts
            if len(posts) == 4:
                print("   ✅ Correct number of posts (4)")
            else:
                print(f"   ⚠️  Expected 4 posts, got {len(posts)}")
            
            # Check first post structure
            if posts:
                first_post = posts[0]
                required_fields = ['id', 'title', 'excerpt', 'image', 'image_alt', 'categories', 'author', 'date', 'read_time', 'slug']
                for field in required_fields:
                    if field in first_post:
                        print(f"   ✓ Post has field: {field}")
                    else:
                        print(f"   ❌ Post missing field: {field}")
        
        return success, response

    def test_get_blog_posts_pagination(self):
        """Test blog posts pagination"""
        return self.run_test(
            "Get Blog Posts (Page 1, 4 per page)",
            "GET",
            "api/posts?page=1&per_page=4",
            200,
            expected_keys=["posts", "total", "page", "per_page", "total_pages"]
        )

    def test_specific_blog_posts(self):
        """Test that specific blog posts exist with correct content"""
        success, response = self.test_get_blog_posts_default()
        
        if not success:
            return False
        
        posts = response.get('posts', [])
        expected_posts = [
            {
                'title': 'Tax-Advantaged Insurance Strategies for High Earners in California',
                'categories': ['INSURANCE TIPS'],
                'author': 'Felix | Pinoy General Insurance Services'
            },
            {
                'title': 'The Hidden Costs of Cheap Insurance: Why Lowest Price Isn\'t Best Value',
                'categories': ['INSURANCE TIPS'],
                'author': 'Felix | Pinoy General Insurance Services'
            },
            {
                'title': 'Condo Insurance vs. HOA Master Policy: What You Actually Need',
                'categories': ['HOME INSURANCE', 'SPECIALTY INSURANCE', 'INSURANCE TIPS'],
                'author': 'Felix | Pinoy General Insurance Services'
            },
            {
                'title': 'Key Person Insurance: Protecting Your Business from the Loss of Critical Employees',
                'categories': ['BUSINESS INSURANCE', 'SPECIALTY INSURANCE'],
                'author': 'Felix | Pinoy General Insurance Services'
            }
        ]
        
        print(f"\n🔍 Verifying specific blog post content...")
        
        for i, expected in enumerate(expected_posts, 1):
            found = False
            for post in posts:
                if post.get('title') == expected['title']:
                    found = True
                    print(f"   ✅ Post {i}: Found '{expected['title'][:50]}...'")
                    
                    # Check categories
                    post_categories = post.get('categories', [])
                    if set(expected['categories']) == set(post_categories):
                        print(f"      ✓ Categories match: {post_categories}")
                    else:
                        print(f"      ❌ Categories mismatch. Expected: {expected['categories']}, Got: {post_categories}")
                    
                    # Check author
                    if post.get('author') == expected['author']:
                        print(f"      ✓ Author correct: {expected['author']}")
                    else:
                        print(f"      ❌ Author mismatch. Expected: {expected['author']}, Got: {post.get('author')}")
                    break
            
            if not found:
                print(f"   ❌ Post {i}: Missing '{expected['title'][:50]}...'")
                return False
        
        return True

    def test_individual_post_by_slug(self):
        """Test getting individual posts by slug"""
        slugs_to_test = [
            'tax-advantaged-insurance-strategies',
            'hidden-costs-cheap-insurance',
            'condo-insurance-vs-hoa-master-policy',
            'key-person-insurance'
        ]
        
        all_passed = True
        for slug in slugs_to_test:
            success, _ = self.run_test(
                f"Get Post by Slug: {slug}",
                "GET",
                f"api/posts/{slug}",
                200,
                expected_keys=['id', 'title', 'excerpt', 'categories', 'author']
            )
            if not success:
                all_passed = False
        
        return all_passed

def main():
    print("🚀 Starting Blog API Tests...")
    print("=" * 50)
    
    # Setup
    tester = BlogAPITester()
    
    # Run tests
    print("\n📡 Testing API connectivity...")
    tester.test_api_root()
    
    print("\n📝 Testing blog posts endpoints...")
    tester.test_get_blog_posts_default()
    tester.test_get_blog_posts_pagination()
    tester.test_specific_blog_posts()
    tester.test_individual_post_by_slug()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.failed_tests:
        print(f"\n❌ Failed tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
            print(f"   - {test['name']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())