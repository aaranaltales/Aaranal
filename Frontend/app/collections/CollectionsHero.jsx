'use client';

export default function CollectionsHero() {
  return (
    <section className="relative h-[100vh] py-32 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-6">
          Complete Collection
        </span>

        <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight mb-6">
          Curated
          <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Excellence
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
          Step into Aaranal’s collection, where every piece is thoughtfully designed with a perfect blend of style, utility, and comfort to complement your everyday lifestyle.
        </p>
      </div>
    </section>
  );
}
