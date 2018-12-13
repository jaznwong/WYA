let {create} = require('../handlers/users')

const _names = [
    'Edward Fowler',
    'Barbara Green',
    'Frances Salazar',
    'Douglas Peterson',
    'Michelle Payne',
    'Walter Weaver',
    'Larry Turner',
    'Kyle Graham',
    'Joan Armstrong',
    'Marie Hicks',
    'Brandon Sanchez',
    'Michelle Olson',
    'Madison Thompson',
    'Eric Schmidt',
    'Charles Rios',
    'Samuel Woods',
    'Barbara Castro'
]

let names = _names.map((name)=>{
    let arr = name.split(' ');
    return {
        firstname: arr[0],
        lastname: arr[1],
        username: arr.join('_'),
        password: "pass"
    }
})

let run = async function(){
    for(let name of names){
        await create(name)
    }
}

run()