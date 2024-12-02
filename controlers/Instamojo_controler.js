export const getToken = async (req,resp)=>{


    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'xfIK5yQvX1XTnkDBunfMYW6xNBfa7z7SjzXXoR27',
          client_secret: 'bCPp6JbHGq8aGxVAv0zIX92rlnK7seXHdZlPWhM1WEqkyOblEwNK598jaV1SFSYh3ieGX8pxtFlshsIzRAU17TMUW1GkAhbiUz5k8tiZ3tDCcumBdZR0SzDOw141XHeT'
        })
      };
      
      fetch('https://api.instamojo.com/oauth2/token/', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}