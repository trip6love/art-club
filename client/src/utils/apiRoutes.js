// Find all of the objects that are paintings and have the word "rabbit" in the title
var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";

export const searchArtMuseum =  async () => {

    var artCall = "https://api.harvardartmuseums.org/image?apikey=d5fa0071-2bef-4273-9a6c-c6fad3b41af9";
    console.log(artCall);
    return await fetch(artCall);
    /*
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data.records);
            })
        }
    })
    */
};