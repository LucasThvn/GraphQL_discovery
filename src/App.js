import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

function Listlaunches() {
  const { loading, error, data } = useQuery(gql`
    {
      launches(limit: 5) {
        id
        launch_date_utc
        rocket {
          rocket_name
        }
        launch_success
        links {
          video_link
        }
        details
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ id, launch_date_utc,rocket,launch_success, links, details }) => (
    <div key={id}>
      <h2>{rocket.rocket_name}</h2>
      <h3>{launch_date_utc}</h3>
      <div>
        <a href={links.video_link} target="blank">See on youtube</a>
        <p style={{"color" : launch_success ? 'green' : 'red'}}>{launch_success ? 'sucess' : 'failure'}</p>
        <p>{details}</p>
      </div>
      <hr></hr>
    </div>
   
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <hr></hr>
        <Listlaunches />
      </div>
    </ApolloProvider>
  );
}

export default App;
