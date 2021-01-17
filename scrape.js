const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.sessions.edu/color-calculator/';


rp(url)
    .then(function(html)
    {
        //success
    })

    .catch(function(err)
    {
        //handles err
    });






function selectHarm(harm)
{
    if(harm.equals("mono"))
    {
        document.getElementById("monochromatic").click();
    }
    else if (harm.equals("comp"))
    {
        document.getElementById("complementary").click();
    }
     
};