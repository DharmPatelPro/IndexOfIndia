import { fetcher } from "../../lib/api";
import React, { useState } from "react";
import styles from '../../styles/Home.module.css'

export const getStaticPaths = async () => {
  const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`)
  const paths = response.data.map((curElem) => {
    return {
      params: {
        slug: curElem.id.toString(),
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  
  const PageResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts/${slug}`)
  console.log(PageResponse);
  return {
    props: {
      PageResponse,
    }
  }
}








const PageData = ({ PageResponse }) => {
  function createMarkup(c) {
    return {__html: c}
  }
  const { title, content } = PageResponse.data.attributes;
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {/* <div className={styles.description}>{content}</div> */}
        {<div className={styles.description} dangerouslySetInnerHTML={createMarkup(content)}></div>}
      </div>
    </>
  );
};

export default PageData
