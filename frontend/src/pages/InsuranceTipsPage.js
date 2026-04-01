import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function BlogCard({ post }) {
  return (
    <article
      data-testid={`blog-card-${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
    >
      {/* Featured Image */}
      <div className="overflow-hidden h-[280px]">
        <img
          src={post.image}
          alt={post.image_alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={(e) => e.target.classList.add("loaded")}
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <span
              key={cat}
              data-testid={`category-badge-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center rounded-xl bg-[#F3F4F6] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#6B7280]"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          data-testid={`blog-title-${post.slug}`}
          className="mt-4 text-xl sm:text-2xl font-bold text-[#1F2937] leading-tight line-clamp-2"
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-3 text-base text-[#6B7280] leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 text-sm text-[#9CA3AF]">
          <p>{post.author}</p>
          <p className="mt-0.5">
            {post.date} &middot; {post.read_time}
          </p>
        </div>
      </div>
    </article>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (page > 4) pages.push("...");
      if (page > 3 && page < totalPages - 2) pages.push(page);
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      data-testid="blog-pagination"
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        data-testid="pagination-prev"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-[#9CA3AF]">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            data-testid={`pagination-page-${p}`}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
              p === page
                ? "bg-[#2563EB] text-white"
                : "border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        data-testid="pagination-next"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default function InsuranceTipsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (p) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/posts`, {
        params: { page: p, per_page: 4 },
      });
      setPosts(res.data.posts);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const handlePageChange = (newPage) => {
    fetchPosts(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" data-testid="insurance-tips-page">
      <Header />

      {/* Page Title */}
      <section
        className="bg-white py-16 md:py-20"
        data-testid="blog-title-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            data-testid="insurance-tips-headline"
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1F2937] tracking-tight"
          >
            Insurance Tips
          </h1>
        </div>
      </section>

      {/* Blog Grid */}
      <section
        className="bg-white pb-16 md:pb-24"
        data-testid="blog-grid-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E5E7EB] overflow-hidden animate-pulse"
                >
                  <div className="h-[280px] bg-gray-200" />
                  <div className="p-8 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>

      {/* Footer / Contact */}
      <ContactSection />
    </div>
  );
}
