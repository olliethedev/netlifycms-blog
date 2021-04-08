import React from 'react'
import { useRouter } from "next/router";

const Post = ({post}) => {
    console.log(post)
    const router = useRouter();
    const { id } = router.query;
    const {title, body} = post;
    return (
        <article>
          <h1>{title}</h1>
          <div>
              {id}
              <div>{title}</div>
              <div>{body}</div>
          </div>
        </article>
    )
}

export default Post;

export async function getServerSideProps({params}){
    const { id } = params;
    console.log(id);
    const post = await import(`../../content/posts/${id}.md`).catch(error => null);
    console.log(post);
    return { props: { post: post.attributes } };
}
