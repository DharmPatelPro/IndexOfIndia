import React, { useState } from 'react'
import { fetcher } from '../lib/api'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import Link from 'next/link'

const blogs = ({AllPostsData}) => {
    const [pageIndex, setPageIndex]=useState(1);
    console.log(AllPostsData)
    const {data} = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,{
        fallbackData: AllPostsData
    })
  return (
    <>
    <h1 className={styles.title}>All Blogs</h1>
        {data && data.data.map((curData)=>{
            return(<div key={curData.id} className={styles.card}>
               <Link href={`blogs/${curData.id}`}>
                <article>
                  <h2>{curData.attributes.title}</h2>                             
                  <p>{curData.attributes.description}</p>
                </article>
                </Link>
            </div>)
        })}


        <div className={styles.pagination}>
        <button
          onClick={() => setPageIndex(pageIndex-1)}
          disabled={pageIndex <= 1}
        >
          Previous
        </button>
        <span>
            {`${pageIndex} of ${data.meta.pagination.pageCount}`}
        </span>
        <button 
          onClick={() =>setPageIndex(pageIndex+1)}
          disabled = {pageIndex === (data.meta.pagination.pageCount)}
        >
          Next
        </button>
        </div>
    
    </>
  )
}

export default blogs

export async function getStaticProps(){
    const ApiResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?pagination[page]=1&pagination[pageSize]=5`);
    return{
        props: {
            AllPostsData : ApiResponse
        }
    }
}


