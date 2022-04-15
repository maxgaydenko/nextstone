import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

// Import the generated Lists API and types from Keystone
import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

type Post = {
  id: string;
  title: string;
  slug: string;
};
type Car = {
  id: string;
  model: string;
}

export default function Posts({ posts, cars }: InferGetStaticPropsType<typeof getStaticProps>) {
 return (
   <div>
     <main style={{ margin: '3rem' }}>
       <Link href={'/'}>back to home</Link>
       <h2>Here are posts</h2>
       <ul>
         {posts.map(post => (
           <li key={post.id}>
             <Link href={`/post/${post.slug}`}>
               <a>{post.title}</a>
             </Link>
           </li>
         ))}
       </ul>
       <h2>Here are cars</h2>
       <ul>{cars.map(car => <li key={car.id}><Link href={`/car/${car.id}`}>{car.model}</Link></li>)}</ul>
     </main>
   </div>
 );
}


export async function getStaticProps() {
 const posts = await query.Post.findMany({ query: 'id title slug' }) as Post[];
 const cars = await query.Car.findMany({query: 'id model'}) as Car[];

 return {
   props: {
     posts,
     cars,
   }
 };
}