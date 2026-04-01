from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import math
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str = ""
    image: str
    image_alt: str
    categories: List[str]
    author: str
    date: str
    read_time: str
    slug: str

class BlogListResponse(BaseModel):
    posts: List[BlogPost]
    total: int
    page: int
    per_page: int
    total_pages: int


# Seed blog posts
SEED_POSTS = [
    {
        "id": "post-1",
        "title": "Tax-Advantaged Insurance Strategies for High Earners in California",
        "excerpt": "Discover how high-income Californians can leverage insurance products for tax efficiency and wealth protection.",
        "content": "",
        "image": "https://images.unsplash.com/photo-1762151717091-4e0633e0c431?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkb2N1bWVudHMlMjBtb25leSUyMHRheCUyMGluc3VyYW5jZXxlbnwwfHx8fDE3NzUwMDA3OTZ8MA&ixlib=rb-4.1.0&q=85",
        "image_alt": "Money and financial documents",
        "categories": ["INSURANCE TIPS"],
        "author": "Felix | Pinoy General Insurance Services",
        "date": "3/25/2026",
        "read_time": "10 min read",
        "slug": "tax-advantaged-insurance-strategies"
    },
    {
        "id": "post-2",
        "title": "The Hidden Costs of Cheap Insurance: Why Lowest Price Isn't Best Value",
        "excerpt": "Understanding why the cheapest insurance policy might cost you more in the long run.",
        "content": "",
        "image": "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwzfHx3YWxsJTIwc3RyZWV0JTIwc2lnbiUyMHN0b2NrJTIwbWFya2V0JTIwZmluYW5jZXxlbnwwfHx8fDE3NzUwMDA4MDF8MA&ixlib=rb-4.1.0&q=85",
        "image_alt": "Wall Street sign",
        "categories": ["INSURANCE TIPS"],
        "author": "Felix | Pinoy General Insurance Services",
        "date": "3/24/2026",
        "read_time": "8 min read",
        "slug": "hidden-costs-cheap-insurance"
    },
    {
        "id": "post-3",
        "title": "Condo Insurance vs. HOA Master Policy: What You Actually Need",
        "excerpt": "Understanding the difference between your HOA's master policy and personal condo insurance, and ensuring you have proper coverage.",
        "content": "",
        "image": "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "image_alt": "Modern apartment building",
        "categories": ["HOME INSURANCE", "SPECIALTY INSURANCE", "INSURANCE TIPS"],
        "author": "Felix | Pinoy General Insurance Services",
        "date": "3/25/2026",
        "read_time": "10 min read",
        "slug": "condo-insurance-vs-hoa-master-policy"
    },
    {
        "id": "post-4",
        "title": "Key Person Insurance: Protecting Your Business from the Loss of Critical Employees",
        "excerpt": "How key person life insurance protects businesses from financial devastation when critical employees die or become disabled.",
        "content": "",
        "image": "https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWxzfGVufDB8fHx8MTc3NTAwMDgxOXww&ixlib=rb-4.1.0&q=85",
        "image_alt": "Business meeting",
        "categories": ["BUSINESS INSURANCE", "SPECIALTY INSURANCE"],
        "author": "Felix | Pinoy General Insurance Services",
        "date": "3/23/2026",
        "read_time": "12 min read",
        "slug": "key-person-insurance"
    },
]


async def seed_blog_posts():
    count = await db.blog_posts.count_documents({})
    if count == 0:
        await db.blog_posts.insert_many(SEED_POSTS)
        logging.info("Seeded %d blog posts", len(SEED_POSTS))


@app.on_event("startup")
async def startup():
    await seed_blog_posts()


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.get("/posts", response_model=BlogListResponse)
async def get_blog_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(4, ge=1, le=20),
    category: Optional[str] = None,
):
    query = {}
    if category:
        query["categories"] = {"$in": [category.upper()]}

    total = await db.blog_posts.count_documents(query)
    total_pages = max(1, math.ceil(total / per_page))
    skip = (page - 1) * per_page

    posts = await db.blog_posts.find(query, {"_id": 0}).skip(skip).limit(per_page).to_list(per_page)
    return {
        "posts": posts,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
    }

@api_router.get("/posts/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        return {"error": "Post not found"}
    return post

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()