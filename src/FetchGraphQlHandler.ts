export const fetchGraphQl = (query, variables) => {
    return fetch("https://magento.test/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables }),
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.errors) {
            throw new Error(result.error.map((err) => err.message).join(", "));
        }
        return result.data;
    });
};