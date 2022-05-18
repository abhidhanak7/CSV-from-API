const fetch =  require('node-fetch')
const request = require('request')
var stringify = require('csv-stringify');
const ObjectsToCsv = require('objects-to-csv')

let newFuction = async () => {
    let data = await fetch('https://api.github.com/search/repositories?q=is:public', { method: 'GET' })
    let newdata = await data.json();
    let itemArray = newdata?.items;
    let newArray = itemArray.map(item => {
        if(item?.language == 'JavaScript' && item?.forks_count>=100 && item?.stargazers_count>=500){
            const lists = []   
            const my_object = {}
            my_object.name=item?.name,
            my_object.description=item?.description,
            my_object.watchers_count= item?.watchers_count,
            my_object.html_url=item?.html_url,
            my_object.stargazers_count= item?.stargazers_count,
            my_object.forks_count= item?.forks_count
            return my_object
        } 
        
    })
    let newData = newArray.filter(item => item!==undefined)
    console.log("data=====>>>>>>>", newData);
    stringify(newData, {
        header: true
    },( (err, output) => {
        const csv = new ObjectsToCsv(newData)
        csv.toDisk('./lists.csv', { append: true });
    }))
}

newFuction()

