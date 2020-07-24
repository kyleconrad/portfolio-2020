Gatsby build of Kyle Conrad's 2020 portfolio redesign/rebuild using Contentful as the content management system.

---

## Local Setup
Running local set up will install all necessary bundles and dependencies. Gatsby must be [installed on the local system](https://www.gatsbyjs.org/tutorial/part-zero/) prior to running this setup.
    
    $ cd portfolio-2020
    $ npm install

---

## Development
Running development will run a local server with Gatsby. It watches all Sass, JS, and images, then compiles and reloads accordingly.

	$ cd portfolio-2020
	$ npm run develop

---

## Building
Building will compile and minify all Sass/CSS, concat and uglify all JS, minify all images, and convert all React templates and Contentful content into a static site. This will result with the entire site ready in the correct directories for deployment.

    $ cd portfolio-2020
    $ npm run build

---

## Serving
To test the static site prior to deployment (and for other content audits), the site must be built and then served in its static form. A better guide to Gatsby audits can be [found here](https://www.gatsbyjs.org/tutorial/part-eight/).

    $ cd portfolio-2020
    $ npm run build
    $ npm run serve

---

## Deploying
Deploying pushes the site to Amazon S3/Cloudfront and invalidates all existing caches, ensuring visitors get the most up to date versions of content, images, and video. You must have the `gatsby-plugin-s3` installed and set up in order to deploy ([see instructions and details](https://www.gatsbyjs.org/packages/gatsby-plugin-s3/)).

    $ cd portfolio-2020
    $ npm run build
    $ npm run deploy