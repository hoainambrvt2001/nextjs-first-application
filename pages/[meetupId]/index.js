import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  // Connect to the database:
  const client = await MongoClient.connect(
    "mongodb+srv://nam_vo:Procutelaai123@cluster0.qhkda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  // Access to the database:
  const db = client.db();
  // Access to the collection named meetups
  const meetupsCollection = db.collection("meetups");
  /* 
  1. By default, find() will find all documents in collections
  2. If the find() has arguments:
  (+) 2.1. First argument to define our filter criteria if we want to find some certain documents not all. However, if {}, we want to find by default.
  (+) 2.2. Second argunment to define the fields of a docment we want to find.
  In this example:
     { _id: 1 } , which means the returned document only included the id but no other field values.
  */
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId; // value of [meetupId]

  // Connect to the database:
  const client = await MongoClient.connect(
    "mongodb+srv://nam_vo:Procutelaai123@cluster0.qhkda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // Find one document, which has _id === meetupId
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        // _id.toString() is important
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
