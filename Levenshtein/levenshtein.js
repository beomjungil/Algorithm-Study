const levenshtein = (a, b) => {
  //Check a or b's length is '0' 
  if(!a || !b) return (b || a).length
  
  //Swap to save some memory 0 (min(a,b)) instead of 0(a)
  if(a.length > b.length){
  	[a, b] = [b, a]
  }
  
  //init row
  let row = []
  for(let i = 0; i <= a.length; i++){
  row[i] = i
  }
 
  //fill in the rest
	let i,j,prev,val
    
  for(i = 1; i <= b.length; i++){
    prev = i;
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        val = row[j-1]; // match
      } else {
        val = Math.min(row[j-1] + 1, // substitution
              Math.min(prev + 1,     // insertion
                       row[j] + 1));  // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row;
}

console.log(levenshtein("back","book"))

