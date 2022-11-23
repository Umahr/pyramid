/**
 * Solve the pyramid puzzle 
 */

function readFile(fileList){
	let file = fileList[0];
	
 	let reader = new FileReader(); 	
 	reader.addEventListener('load', function(){ process(reader.result)});
 	reader.readAsText(file);
 	
}

function process(input){
	let vals = input.split(/\r?\n/);
	let target = vals[0].replace('Target: ', '');
	let total = "0";
	let depth = "0";
	let position = "0";
	let goRight = 0;
	let maxDepth;
	let directions = new Array();
	
	vals.shift();
	maxDepth  = vals.length - 1;
	for(let i = 0; i <= maxDepth; ++i){
		vals[i] = vals[i].split(',');
	}
	
	total = vals[0];
	/* 
	 * we are always going as far down the left branch as possible
	 * if we reach a point where we cannot continue we will go back up a level, continue down
	 * the other node if not already traversed, and continue prioritising going left.
	*/
	while(total != target || (total == target && depth != maxDepth)){
		//navigate back up the tree if you reach the end or become too large
		if(total >= target || depth == maxDepth){
			if(directions[depth-1] == "L"){
				total = total / vals[depth][position];
				depth--;
				directions.pop();
				goRight = 1;
			} else{
				//go up the entire right chain
				while(directions[depth-1] == "R"){
					total = total / vals[depth][position];
					depth--;
					position--;
					directions.pop();
				}
				//now go up from the completely checked left node. if there is no where else to go, exit
				if(depth == 0){
					let error = "The value was not found in the pyramid.";
					document.getElementById("output2").innerHTML = error;
					break;
				}else{
					total = total / vals[depth][position];
					depth--;
					directions.pop();				
					goRight = 1;
				}
			}
		}
		//go right
		if (goRight == 1){
			directions.push("R");
			depth++;
			position++;
			goRight = 0;
			total = total * vals[depth][position];
		}else {  //go left
			directions.push("L");
			depth++;
			total = total * vals[depth][position];
		}
	
	

	}
		document.getElementById("output").innerHTML = directions.join("");
} 
 
 const fileSelect = document.getElementById('file_upload');
 fileSelect.addEventListener('change', function(){ readFile(event.target.files) });
 
