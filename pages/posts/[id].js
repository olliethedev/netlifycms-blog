import React from 'react'
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const getComponent = (id)=> dynamic(() =>
  import(`../../content/posts/${id}.md`).then((mod) => mod.react)
)

const Post = ({}) => {
    const router = useRouter();
    const { id } = router.query;
    let DynamicComponent;
    if(id){
        DynamicComponent = getComponent(id);
    }
    console.log(DynamicComponent);
    return (
        <article>
          <div>
              {id}
              {/* <div>{title}</div> */}
              {id&&<DynamicComponent />}
          </div>
        </article>
    )
}

export default Post;

// export async function getServerSideProps({params}){
//     const { id } = params;
//     console.log(id);
//     const post = await import(`../../content/posts/${id}.md`).catch(error => null);
//     console.log(post);
//     return { props: { post: post.attributes } };
// }
