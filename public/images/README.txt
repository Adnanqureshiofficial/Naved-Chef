Drop real photos here with these EXACT filenames (or edit the paths in the
matching .md frontmatter / .astro files if you'd rather use different names):

/public/images/hero.jpg                          <- used in src/components/Hero.astro
/public/images/bio-main.jpg                      <- used in src/components/Bio.astro
/public/images/bio-detail.jpg                    <- used in src/components/Bio.astro
/public/images/dishes/gold-leaf-croissant-hero.jpg
/public/images/dishes/deconstructed-tiramisu-hero.jpg
/public/images/dishes/chocolate-showpiece-hero.jpg

For every NEW dish you add in src/content/dishes/*.md, set its `heroImage`
frontmatter field to wherever you put that dish's photo, e.g.:

  heroImage: "/images/dishes/my-new-dish-hero.jpg"

Then place the actual file at public/images/dishes/my-new-dish-hero.jpg
(note: the frontmatter path starts with /images/... not /public/images/...
— Astro serves everything in /public from the site root).
