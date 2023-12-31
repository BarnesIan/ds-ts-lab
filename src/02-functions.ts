import {Friend, Colleague, EmailContact } from './myTypes'

import { friends, colleagues } from "./01-basics";

function older(f: Friend) {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

// add 1 year to all friends age
function allOlder(f: Friend[]) {
    let j : string[] = []
    for(let i = 0; i < f.length; i++){
        f[i].age += 1;

        j.push(f[i].name + " is now " + f[i].age)
    }
    return j;
}
console.log(allOlder(friends))


// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred return type
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
  console.log(highestExtension(colleagues.current));

  //Add a colleague with the new highest extension
  function addColleague(cs: Colleague[], name: string, department: string, email:string){
    let newColleague : Colleague = {
        name: name,
        department: department,
        contact: {
            email: email,
            extension: highestExtension(cs).contact.extension +=1        
        }
    } 
    cs.push(newColleague);
  }

  addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));


function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number     // CHANGED
  ): EmailContact[] {
    let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
  }
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW
 
  //Find friends using a boolean check on the array
  function findFriends(
    friends : Friend[],
    filter: (f1: Friend) => boolean) : string[] {  
        const filtered = friends.filter(filter)
        const result: string[] = filtered.map((m) => m.name)
        return result;
    }
    //test
    console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
    console.log(findFriends(friends, (friend) => friend.age < 35));


   function addInterest(friend: Friend, newInterests: string){
    if (!friend.interests) {

        friend.interests = []; // Ensure interests array exists if it's not already made for that Friend
    }
     friend.interests.push(newInterests)
     return friend.interests 
    }
    //test
    console.log(addInterest(friends[1], 'Politics'))