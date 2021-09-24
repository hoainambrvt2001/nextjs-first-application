import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active NextJS meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // To fetch data from an API

  // Connect to the database:
  const client = await MongoClient.connect(
    "mongodb+srv://nam_vo:Procutelaai123@cluster0.qhkda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  // Access to the database:
  const db = client.db();
  // Access to the collection named meetups
  const meetupsCollection = db.collection("meetups");
  // By default, find() will find all documents in collections
  const meetups = await meetupsCollection.find().toArray();
  // Close connect to database:
  client.close();

  return {
    props: {
      // Convert data to object
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
