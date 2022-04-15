import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

type Car = {
  id: string;
  model: string;
  power: number;
};

export default function CarPage({ car }: { car: Car }) {
  return (
    <div>
      <main style={{ margin: '3rem' }}>
        <div>
          <Link href="/items">
            <a>&larr; back to items list</a>
          </Link>
        </div>
        <h1>{car.model}</h1>
        <p>{car.power}</p>
      </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const cars = (await query.Car.findMany({
    query: `id`,
  })) as { id: string }[];

  const paths = cars
    .filter(({ id }) => !!id)
    .map(({ id }) => `/car/${id}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const car = (await query.Car.findOne({
    where: { id: params!.id as string },
    query: 'id model power',
  })) as Car | null;
  if (!car) {
    return { notFound: true };
  }
  return { props: { car } };
}