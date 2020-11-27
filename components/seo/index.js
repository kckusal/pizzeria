import React from "react";
import { NextSeo } from "next-seo";
import siteMeta from "configs/site.meta";

const SEO = ({ title, description }) => (
  <NextSeo
    title={title}
    description={description}
    titleTemplate={siteMeta.seo.titleTemplate}
  />
);

export default SEO;
