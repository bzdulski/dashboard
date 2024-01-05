export const AppMain = ({ render, children }) => {

    let className

    switch(render) {
        case "isLoading": { className = `flex h-[100vh] items-center justify-center`; break}
        case "isLoaded": { className = "flex h-[100vh]"; break}
    }

    return ( 
        <main className={className}>
            {children}
        </main>
    )
}