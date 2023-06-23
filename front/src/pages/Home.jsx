import useStore from "../store";

function Home() {

    const {auth} = useStore();

    return (
        <>
            <h1>Bonjour {auth.user?.email}</h1>
        </>
    )
}

export default Home;