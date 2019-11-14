const {GraphQLServer} =require('graphql-yoga')
const fetch =require('node-fetch')

const typeDefs = `
type Query {
    hello(name: String): String!
    getProject(id:Int!):Project
    getContributors(Name:String):[Contributors]
}

type Contributors{
    Name:String,
    Designation:String
}

type Project{
    id: Int,
    description:String,
    name: String,
    name_with_namespace: String,
    path: String,
    path_with_namespace: String,
    created_at: String,
    default_branch:String,
    ssh_url_to_repo:String,
    http_url_to_repo:String
    namespace:[Namespace]
}
type Namespace{
    id: String,
    name: String,
    path: String,
    kind: String,
    full_path: String,
    parent_id: String,
    avatar_url: String,
    web_url: String
}
`;

const resolvers = {
    Project:{
        namespace:parent => {
            const namesps= parent.namespace.map( async (url) => {
                const respo = await fetch(url);
                return respo.json();
            });
            return namesp.all(namesps);
        }
    //     namespace:async parent => {
    //     console.log(parent.space)
    //     const resposne = await fetch(parent.namespace);
    //     return resposne.json();   
    // }
},

    Query: {
        hello :(_, {name}) => `Hello ${name || "World"}`,
        getProject: async (_, { id }) =>{
            const resposne= await fetch(`https://gitlab.com/api/v4/projects/${id}/`);
            console.log(resposne)
            return resposne.json();
        },
        getContributors: async (_, { Name } ) =>{
            // const resposne =await fetch(`https://api.myjson.com/bins/o2rt2/${Name}/`);
            // const resposne =await fetch(`https://api.myjson.com/bins/7f2au/`);
            //const resposne =await fetch(`./Data/ProjectDetails.json`);
            const resposne =await fetch(`https://api.myjson.com/bins/11b0va/`);
            console.log(resposne)
            return resposne.json();
        }
    }
};

// const QUERY=gql{
//     getProject(id:14989998){
//         name
//         path
//         name_with_namespace
//     }
// };

const server = new GraphQLServer({typeDefs,resolvers}); 
server.start(() =>console.log("server is running on localhost:4000"));