import { groq } from 'next-sanity';

// Retreats
export const retreatsQuery = groq`
  *[_type == "retreat" && isActive == true] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    totalSpots,
    spotsRemaining,
    basePrice,
    earlyBirdPrice,
    earlyBirdDeadline,
    depositAmount,
    isFeatured,
    description,
    "image": image.asset->url
  }
`;

export const featuredRetreatQuery = groq`
  *[_type == "retreat" && isActive == true && isFeatured == true][0] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    spotsRemaining,
    basePrice,
    earlyBirdPrice,
    earlyBirdDeadline
  }
`;

export const nextRetreatQuery = groq`
  *[_type == "retreat" && isActive == true && startDate > now()] | order(startDate asc)[0] {
    _id,
    title,
    startDate,
    endDate,
    spotsRemaining,
    totalSpots,
    basePrice
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    "photo": photo.asset->url,
    quote,
    service,
    videoUrl,
    featured
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    name,
    "photo": photo.asset->url,
    quote,
    service,
    videoUrl
  }
`;

export const testimonialsByServiceQuery = groq`
  *[_type == "testimonial" && service == $service] | order(order asc) {
    _id,
    name,
    "photo": photo.asset->url,
    quote,
    videoUrl
  }
`;

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Team
export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    credentials,
    "photo": photo.asset->url,
    shortBio,
    fullBio,
    education,
    certifications,
    experience,
    videoIntroUrl
  }
`;

// Blog
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "author": author->{name, "photo": photo.asset->url},
    categories,
    publishedAt,
    featured
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    body,
    "author": author->{name, "photo": photo.asset->url, role},
    categories,
    publishedAt,
    seoTitle,
    seoDescription
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    publishedAt
  }
`;

export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && $category in categories] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    publishedAt
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    email,
    phone,
    whatsapp,
    instagram,
    calendlyUrl,
    location,
    urgencyBar,
    "ogImage": ogImage.asset->url
  }
`;

// ============================================================
// SCHOOL QUERIES
// ============================================================

// Modalities
export const modalitiesQuery = groq`
  *[_type == "modality"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    "icon": icon.asset->url,
    "featuredImage": featuredImage.asset->url,
    color,
    isProprietary,
    order
  }
`;

export const modalityBySlugQuery = groq`
  *[_type == "modality" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    "icon": icon.asset->url,
    "featuredImage": featuredImage.asset->url,
    color,
    isProprietary,
    "createdBy": createdBy->{name, "photo": photo.asset->url}
  }
`;

// Courses
export const coursesQuery = groq`
  *[_type == "course"] | order(level asc, order asc) {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    "modality": modality->{_id, title, slug, color},
    level,
    tier,
    format,
    formatNote,
    duration,
    totalHours,
    price,
    earlyBirdPrice,
    paymentPlans,
    enrollmentOpen,
    maxStudents,
    nextStartDate,
    featured,
    accreditation,
    outcomes,
    "certification": certification->{title, slug, accreditedBy},
    "prerequisites": prerequisites[]->{_id, title, slug, level, tier}
  }
`;

export const featuredCoursesQuery = groq`
  *[_type == "course" && featured == true] | order(level asc) {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    "modality": modality->{_id, title, slug, color},
    level,
    tier,
    format,
    duration,
    price,
    enrollmentOpen
  }
`;

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    description,
    "featuredImage": featuredImage.asset->url,
    "modality": modality->{_id, title, slug, color, "featuredImage": featuredImage.asset->url},
    level,
    tier,
    format,
    formatNote,
    duration,
    totalHours,
    price,
    earlyBirdPrice,
    depositAmount,
    paymentPlans,
    modules[] {
      title,
      description,
      duration,
      "lessons": lessons[]->{
        _id,
        title,
        slug,
        contentType,
        estimatedMinutes,
        isFree,
        description
      }
    },
    "prerequisites": prerequisites[]->{_id, title, slug, level, tier, "modality": modality->{title, slug}},
    outcomes,
    "certification": certification->{_id, title, slug, description, "badgeImage": badgeImage.asset->url, accreditedBy, validityPeriod, requirements},
    accreditation,
    "instructor": instructor->{name, slug, role, credentials, "photo": photo.asset->url, shortBio},
    enrollmentOpen,
    maxStudents,
    nextStartDate,
    seoTitle,
    seoDescription
  }
`;

export const coursesByModalityQuery = groq`
  *[_type == "course" && modality->slug.current == $modalitySlug] | order(level asc) {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    "modality": modality->{_id, title, slug, color},
    level,
    tier,
    format,
    duration,
    price,
    enrollmentOpen
  }
`;

// Certifications
export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    "badgeImage": badgeImage.asset->url,
    accreditedBy,
    validityPeriod,
    requirements
  }
`;

// Practitioners
export const practitionersQuery = groq`
  *[_type == "practitioner" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    "photo": photo.asset->url,
    shortBio,
    certifications[] {
      "certification": certification->{title, slug, "badgeImage": badgeImage.asset->url},
      dateEarned
    },
    services[] {
      title,
      duration,
      price,
      format
    },
    location,
    specialties,
    languages,
    featured,
    bookingUrl
  }
`;

export const featuredPractitionersQuery = groq`
  *[_type == "practitioner" && isActive == true && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    "photo": photo.asset->url,
    shortBio,
    certifications[] {
      "certification": certification->{title, slug},
      dateEarned
    },
    location,
    specialties
  }
`;

export const practitionerBySlugQuery = groq`
  *[_type == "practitioner" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "photo": photo.asset->url,
    bio,
    shortBio,
    certifications[] {
      "certification": certification->{_id, title, slug, description, "badgeImage": badgeImage.asset->url, accreditedBy},
      dateEarned,
      certificateNumber
    },
    services[] {
      title,
      description,
      duration,
      price,
      format
    },
    location,
    bookingUrl,
    email,
    website,
    instagram,
    specialties,
    languages
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && date > now() && registrationOpen == true] | order(date asc) {
    _id,
    title,
    slug,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    eventType,
    date,
    endDate,
    timezone,
    format,
    location,
    price,
    maxAttendees,
    "facilitator": facilitator->{name, "photo": photo.asset->url},
    "relatedModality": relatedModality->{title, slug}
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    eventType,
    date,
    endDate,
    timezone,
    format,
    location,
    meetingUrl,
    price,
    maxAttendees,
    registrationOpen,
    "facilitator": facilitator->{name, slug, role, "photo": photo.asset->url},
    "relatedCourse": relatedCourse->{title, slug},
    "relatedModality": relatedModality->{title, slug}
  }
`;

// Digital Products
export const digitalProductsQuery = groq`
  *[_type == "digitalProduct"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    "featuredImage": featuredImage.asset->url,
    productType,
    price,
    featured,
    "relatedModality": relatedModality->{title, slug}
  }
`;

// School-specific testimonials
export const schoolTestimonialsQuery = groq`
  *[_type == "testimonial" && service in ["course", "school-retreat", "community"]] | order(order asc) {
    _id,
    name,
    "photo": photo.asset->url,
    quote,
    service,
    videoUrl,
    featured,
    "relatedCourse": relatedCourse->{title, slug}
  }
`;

// School FAQs
export const schoolFaqsQuery = groq`
  *[_type == "faq" && category in ["school", "courses", "certification", "community"]] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`;
