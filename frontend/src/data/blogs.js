const blogs = [
  {
    id: "building-cravzo",
    title: "Building Cravzo — A Founder's Journey",
    slug: "building-cravzo",
    date: "2026-05-15",
    readTime: "5 min read",
    tags: ["E-commerce", "React", "Startup"],
    excerpt:
      "What it took to design, build, and launch a full-stack e-commerce platform from scratch — the decisions, the tech stack, and the lessons learned.",
    content: `## The Idea

Cravzo started as a simple observation: most small e-commerce sites look outdated, feel slow, and don't inspire trust. I wanted to build something that felt premium from the first tap — clean, fast, and mobile-first.

## Tech Choices

- **React** for the frontend — familiar, component-driven, great ecosystem.
- **Node.js + MongoDB** for the backend — rapid to prototype, scales well.
- **Tailwind CSS** for styling — utility-first keeps the bundle small and the UI consistent.

## The Hard Part

The hardest part wasn't the code — it was the product decisions. What features to cut? How to handle payments? What makes a user trust a store they've never heard of?

I focused on three things:

1. **Visual polish** — every pixel matters for trust.
2. **Speed** — a slow store loses customers.
3. **Simplicity** — less clutter, more clarity.

## What's Next

Cravzo is live at [cravzo.shop](https://cravzo.shop). Right now it's a proof of concept. The next step is adding real payment integration and expanding the product catalog.

Building in public has been the most rewarding part.`,
  },
  {
    id: "react-three-fiber-tips",
    title: "React Three Fiber — Tips for 3D Portfolios",
    slug: "react-three-fiber-tips",
    date: "2026-04-28",
    readTime: "4 min read",
    tags: ["Three.js", "React", "3D"],
    excerpt:
      "Practical tips for integrating 3D scenes into a React portfolio without killing performance or accessibility.",
    content: `## Why 3D?

A 3D element in a portfolio makes an instant impression. But it's easy to overdo it and ruin the UX.

## Performance First

- Use \`AdaptiveDpr\` from drei — it adjusts pixel ratio based on device capability.
- Keep particle counts reasonable (500-2000 is plenty).
- Use \`@react-three/drei\` primitives instead of building everything from scratch.

## Layering with HTML

The trick is separating the 3D canvas from the HTML content. Use \`pointer-events: none\` on the canvas wrapper and let the HTML sit on top.

## Camera Setup

For a navbar cube, keep the camera close (fov 22-30) and position it so the cube fills the viewport without distortion.

## What I'd Do Differently

I'd start with a simpler scene and add complexity gradually. My first version tried to do too much at once.`,
  },
];

export default blogs;
