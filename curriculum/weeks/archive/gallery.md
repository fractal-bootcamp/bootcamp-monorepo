# NextJS Image Gallery Application

Building a performant Image Gallery stresses many core NextJS (and Web) features.
How will you achieve beautiful loads? How will you achieve infinite scrolling without annoying the user?
What about caching? What about Server versus Client rendered components and pages?
Will you use layouts? Which ones? Why?

This assignment is about reading the NextJS documentation closely, and understanding some of its core capabilities:
eg:

- [composing server & client components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [caching](https://nextjs.org/docs/app/building-your-application/caching)
- [streaming & loading with suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
- [image optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [layouts & pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

## Core Concept

Students build a photo gallery application that fetches and displays large collections of images from public APIs, implementing proper optimization, loading states, and caching.

![image](https://github.com/user-attachments/assets/244ffce9-0328-4cac-a012-79cef518b2bb)
Example: [Cosmos Public Works](https://public.work/)

## Required Features

1. **Image-Focused Experience**
   - Gallery view with masonry layout
   - Individual image detail pages
   - Category filtering
   - Search functionality

2. **Data Sources**
   - Unsplash API (https://unsplash.com/developers) - High-quality, varied images
   - Pexels API (https://www.pexels.com/api/) - Alternative image source
   - Pixabay API (https://pixabay.com/api/docs/) - Additional image variety

3. **NextJS Features Stressed**

   - **Image Optimization**
     - Proper implementation of Next/Image for all gallery images
     - Responsive sizing using sizes attribute
     - Priority loading for above-the-fold content
     - Placeholder strategies (blur, dominant color)

   - **Data Fetching & Caching**
     - Server components to fetch image collections
     - Implementing incremental static regeneration for popular galleries
     - On-demand revalidation for new content

   - **Routing**
     - Dynamic routes for image detail pages (`/images/[id]`)
     - Category-based routes (`/category/[name]`)
     - Search results with query parameters

   - **Server-Side Rendering**
     - SEO-friendly image detail pages with metadata
     - Generating proper alt text and page titles

   - **Streaming & Suspense**
     - Infinite scroll implementation with streaming data
     - Loading states with skeleton placeholders
     - Suspense boundaries for different sections

## Project Structure

```text
app/
├── page.js               # Home with featured galleries
├── search/
│   └── page.js           # Search results
├── category/
│   └── [category]/
│       └── page.js       # Category-specific galleries
├── images/
│   └── [id]/
│       └── page.js       # Individual image detail
├── api/
│   └── revalidate/
│       └── route.js      # Revalidation endpoint
└── components/
    ├── Gallery.js        # Server component for image grid
    ├── ImageCard.js      # Client component for hover effects
    ├── ImageDetail.js    # Server component for image metadata
    └── InfiniteScroll.js # Client component for loading more
```

## Why This Stresses NextJS Features

1. **Image Optimization Challenge**
   - Students must handle hundreds of images efficiently
   - Forces use of Next/Image with proper sizing and loading strategies
   - Requires understanding of image priority, quality, and formats

2. **Caching Strategy Requirements**
   - Popular galleries need caching (ISR)
   - Recently uploaded images need dynamic fetching
   - Search results require server-side processing

3. **Loading State Management**
   - Large image collections require proper loading states
   - Infinite scroll implementation stresses Suspense boundaries
   - Forces use of streaming for progressive content loading

4. **Server vs. Client Components**
   - Image data fetching belongs on server components
   - Interactive elements (likes, favorites) need client components
   - Requires understanding the "split" between server and client code

Optimization problems become immediately apparent to students in this assignment

## What Does Good Look Like??

> Detailed Requirements for an "A" Grade NextJS Image Gallery

To meet the highest standards in this assignment, students should demonstrate mastery of NextJS features through their implementation. Here's what "good" looks like:

### Image Handling Excellence

#### Image Component Implementation

- **Proper Usage:** Every image uses Next/Image component with appropriate properties
- **Responsive Sizing:** Correct implementation of `sizes` attribute that adjusts based on viewport size
- **Priority Loading:** Properly marked above-the-fold images with `priority={true}`
- **Placeholder Strategy:** Implementation of blur placeholders for all images:

  ```jsx
  <Image
    src={imageUrl}
    alt={imageDescription}
    width={width}
    height={height}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    placeholder="blur"
    blurDataURL={blurHash || smallImageUrl}
    priority={isPriority}
  />
  ```

#### Image Grid Performance

- Masonry or grid layout that properly resizes images without layout shift
- Efficient rendering that maintains proper aspect ratios
- No visible performance degradation when scrolling through 100+ images

### Data Fetching & Caching Mastery

#### Strategic API Usage

- Appropriate selection of which API endpoints to cache vs. fetch dynamically
- Implementation of revalidation strategies based on content type:

  ```jsx
  // For category pages that change infrequently
  export async function generateStaticParams() {
    const categories = await fetchCategories();
    return categories.map(category => ({ category: category.slug }));
  }
  
  // For specific image collection
  async function fetchGalleryImages(category) {
    return fetch(`https://api.unsplash.com/photos?query=${category}`, { 
      next: { revalidate: 3600 } 
    })
    .then(res => res.json());
  }
  
  // For search results that should be fresh
  async function fetchSearchResults(query) {
    return fetch(`https://api.unsplash.com/search/photos?query=${query}`, { 
      cache: 'no-store' 
    })
    .then(res => res.json());
  }
  ```

#### Proper Error Handling

- Graceful fallbacks when API limits are reached
- Error boundaries around each data-fetching component
- Retry mechanisms for failed image loads

### Loading States & UX

#### Suspense Implementation

- Strategic Suspense boundaries that allow partial content rendering:

  ```jsx
  <div className="gallery-container">
    <GalleryHeader category={category} />
    
    <Suspense fallback={<GallerySkeletonGrid count={12} />}>
      <GalleryGrid category={category} />
    </Suspense>
    
    <Suspense fallback={<RelatedCategoriesSkeleton />}>
      <RelatedCategories category={category} />
    </Suspense>
  </div>
  ```

#### Infinite Scroll

- Seamless loading of additional images when scrolling
- No visible "jumps" in layout when new content loads
- Loading indicators that don't disrupt the browsing experience

#### Progressive Enhancement

- Core functionality works without JavaScript
- Enhanced experience with client-side features

### Server vs. Client Components

#### Correct Component Split

- **Server Components:** All data fetching, image metadata extraction, initial rendering
- **Client Components:** Interactive elements, infinite scroll behavior, favoriting
- Proper "use client" directives only where needed:

  ```jsx
  // ImageCard.jsx - Client Component
  'use client';
  
  import { useState } from 'react';
  import Image from 'next/image';
  
  export default function ImageCard({ image, onFavorite }) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className={`image-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image 
          src={image.urls.regular} 
          alt={image.alt_description || 'Gallery image'} 
          width={image.width} 
          height={image.height}
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={image.urls.thumb}
        />
        {isHovered && (
          <button onClick={() => onFavorite(image.id)}>
            Favorite
          </button>
        )}
      </div>
    );
  }
  ```

### Routing & Navigation

#### Clean URL Structure

- Semantic routes that reflect content hierarchy
- Proper handling of dynamic parameters
- Maintenance of scroll position when navigating back

#### Meta Information

- Dynamic metadata for SEO on all pages
- Proper Open Graph tags for sharing
- Implementation of structured data for image content:

  ```jsx
  export async function generateMetadata({ params }) {
    const image = await fetchImage(params.id);
    
    return {
      title: `${image.description || 'Image'} by ${image.user.name}`,
      description: image.alt_description || `Photo by ${image.user.name}`,
      openGraph: {
        images: [{ url: image.urls.regular, width: image.width, height: image.height }],
      },
    };
  }
  ```

### Performance Metrics

#### Core Web Vitals

- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Measurable improvement when Next/Image is used vs. raw img tags

#### Lighthouse Scores

- Performance score > 90
- Accessibility score > 95
- SEO score > 95

### API Integration

#### Compliance with API Requirements

- Proper attribution to image sources (required by Unsplash, Pexels, etc.)
- Efficient use of API rate limits
- Appropriate error handling when limits are exceeded

#### Rate Limit Management

- Intelligent batching of requests
- Caching to minimize duplicate requests
- Fallback content when limits are reached

### Code Quality

#### Component Organization

- Clean separation of concerns
- Reusable components for common patterns
- Proper TypeScript typing (if applicable)

#### Documentation

- Clear comments explaining implementation decisions
- Documentation of caching strategies
- Explanation of component hierarchy

### Bonus Features

#### Advanced Image Techniques

- Implementation of art direction with multiple image sources
- Proper handling of AVIF and WebP formats
- Image color extraction for UI theming

#### User Experience Enhancements

- Image zoom on detail pages
- Keyboard navigation support
- Accessibility features for screen readers
