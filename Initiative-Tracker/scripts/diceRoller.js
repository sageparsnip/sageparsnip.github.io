// MOST BASIC - TAKE IN A STRING IN FORMAT xdy AND OUTPUT RESULTS OF THE ROLLS IN ARRAY FORMAT.
function roll(diceString){
    //diceString expected input as "xdy"
    diceString = diceString.toUpperCase();
    var results = [];
    var [dice, sides] = diceString.split('D');
    for(var i=0;i<dice;i++){
        results[i] = Math.floor(Math.random() * sides) + 1;
    }
    return results;
}

//SLIGHTLY MORE ADVANCED - TAKE IN A STRING IN FORMAT "xdy + <something>" AND OUTPUT RESULTS
function rollWithMod(input){
    var results = []
    //Step one: see how many of these <something>s we have
    var rollsAndMods = input.split('+'); //Gives an array, split at the "+" symbol (i.e. 1d20 + STR + DEX gives us 1d20, STR, DEX)
    for(let i=0;i<rollsAndMods.length;i++){
        rollsAndMods[i] = rollsAndMods[i].trim().toUpperCase(); //Remove excess spacing for regexes, and uppercase it.
        var somethingLogged = false;              //Simple boolean to keep track of if we got a result for this <something>
            //for each of the rolls/modifiers:
            //Step two: determine what the <something> we are currently operating on is.
            //In general, we can assume it will be either 1) A dice set (xdy), 2) A modifier (STR, INT, SAM), 3) A DC Call, or 4) A number.
        var diceRegex = new RegExp('[0-9]D[0-9]');
        var modCheck = ['STR','DEX','CON','INT','WIS','CHA','SAM'];
        if (diceRegex.test(rollsAndMods[i])){
            //<something> is a dice set! Roll it, and log the results.
            results[i] = roll(rollsAndMods[i]);
            somethingLogged = true;
        }
        else if(modCheck.includes(rollsAndMods[i])){
            //<something> is a modifier! Log the correct modifier in results.
            if(rollsAndMods[i] == "SAM"){
                results[i] = Number(document.getElementById(rollsAndMods[i]).value);
                somethingLogged = true;
            }
            else{
                results[i] = getStatMod(document.getElementById(rollsAndMods[i]).value);
                somethingLogged = true;
            }
        }
        else if(rollsAndMods[i].includes("DC")){
            //<something> is a DC! It could either be in the form "SSDC <stat>" or "DC<number> <stat>"
            if(rollsAndMods[i].includes("SSDC")){
                //<something> is a spell-save! 
                results[i] = "DC" + document.getElementById("SSDC").value + " " + rollsAndMods[i].split(" ")[1] + " Save";
                somethingLogged = true;
            }
            else{
                results[i] = rollsAndMods[i] + " Save";
                somethingLogged = true;
            }
        }
        else if(!(isNaN(Number(rollsAndMods[i])))){
            //<something> is a number! Add it to the array.
            results[i] = rollsAndMods[i];
            somethingLogged = true; 
        }
        else{
            alert("Invalid input...");
            break;
        }
    }
    //We now have an array, results, with all of the individual components of the roll.
    console.log(results);
    var resultsNums = []; //Place to store numerical results.
    var resultsStrings = []; //Place to store string results.
    for(let i=0;i<results.length;i++){
        if(Array.isArray(results[i])){
            //We have an array. This means the result set of an "xdy" input.
            for(let j=0;j<results[i].length;j++){
                //Log each of the result numbers to "resultsNums".
                resultsNums.push(results[i][j]);
            }
        }
        else{
            //We do not have an array. This means either a number, or a DC string.
            if(isNaN(results[i])){
                //This component isn't a number - it's a DC.
                resultsStrings.push(results[i]);
            }
            else{
                resultsNums.push(results[i]);
            }
        }
    }
    //We have separated out the strings from the numbers.
    //The final returned output should be the strings, followed by a full stop, followed by each numerical result, followed by a total.
    var output = '';
    if(resultsStrings.length > 0){
        //We have a string; we should add each to the return, followed by a full stop.
        for(let i=0;i<resultsStrings.length;i++){
            output += resultsStrings[i];
            output += ". ";
        }
    }
    if(resultsNums.length > 0){
        //We have at least 1 number; we should add them all together, logging each individual number, and print the result.
        if(resultsNums.length == 1){
            //Just one number. Print it, but don't do any addition.
            output += resultsNums[0];
            output += ".";
        }
        else{
            //More than one number! Add them until we get to the last in sequence, then add and sum.
            var runner = 0; //Keep track of result here!
            for(let i=0;i<resultsNums.length;i++){
                if(i!=resultsNums.length - 1){
                    //Not the last in the sequence; add it to the output string, and to the runner.
                    output += resultsNums[i] + " + ";
                    runner += Number(resultsNums[i]);
                }
                else{
                    //Last in the sequence; print the last num, plus equals, plus final runner.
                    output += resultsNums[i] + " = ";
                    runner+= Number(resultsNums[i]);
                    output += runner + ".";
                }
            }
        }
    }
    return output;
}

function rollDice(dice) {
	//If the modifier input is null, check the modifier textbox on the page.
	const modAdd = document.getElementById("dice-roller-modifier").value;
	const modInt = Number(modAdd);
    const result = roll("1" + dice);
    const final = result[0] + modInt;
    // Update the result element on the page
    const resultElement = document.getElementById("dice-roller-results");
    resultElement.innerHTML += `${dice} roll: ${result} + ${modAdd}  = <b>${final}</b>!<br>`;
    // Scroll to the bottom of the log
    resultElement.scrollTop = resultElement.scrollHeight;

    //IMPORTANT ASPECT - SAVING JSON IN BROWSER STORAGE.
    lastRollResult = {'last':final};
    localStorage.setItem('lastRollResult', JSON.stringify(lastRollResult));
}

function rollDiceSkill(button){
    var modal = document.getElementById("diceRollPopup");
    modal.style.display = "block";
    var skill = button.getElementsByTagName('h6')[0].textContent;
    skill = skill.substring(0, skill.length-1);
    document.getElementById("diceRollPopupHeader").innerHTML = skill;
    //Set checked at time of popup to skill default
    document.getElementById("Radio" + getStatFromSkill(skill)).checked = true;
}

function rollDiceSkillConfirmed(num){
    var skill = document.getElementById("diceRollPopupHeader").innerHTML; 
    const resultElement = document.getElementById("dice-roller-results");
    //console.log(skill);
    if      (document.getElementById("RadioSTR").checked) var stat = "STR";
    else if (document.getElementById("RadioDEX").checked) var stat = "DEX";
    else if (document.getElementById("RadioCON").checked) var stat = "CON";
    else if (document.getElementById("RadioINT").checked) var stat = "INT";
    else if (document.getElementById("RadioWIS").checked) var stat = "WIS";
    else var stat = "CHA";
    //console.log(stat);
    if(num == 1) {
        rollDiceEx('1d20', stat, skill);
    }
    if(num == 2){
        rollDiceEx('1d20', stat, skill);
        rollDiceEx('1d20', stat, skill);
    }
    var modal = document.getElementById("diceRollPopup");
    modal.style.display = "none";
}

function rollDiceStat(button){
    var stat = button.getElementsByTagName('h5')[0].textContent.substring(0,3);
    console.log(stat);
    rollDiceEx('1d20', stat, 'Base');
}

function rollDiceSave(button){
    var stat = button.getElementsByTagName('h6')[0].textContent.substring(0,3);
    console.log(stat);
    var skill = button.getElementsByTagName('h6')[0].textContent.substring(0,8);
    console.log(skill);
    rollDiceEx('1d20', stat, skill);    
}

function rollDiceEx(dice, stat, skill) {
    var modScore = document.getElementById(stat).value; //Get the stat responsible.
    var modStat  = getStatMod(modScore);
    var profToggle = false;
    var expToggle = false;
    var jackToggle = false;
    try{
        var jackToggle = document.getElementById("JoaT").checked;
    }catch(error){
        //Ignore errors, leave as false.
    }
    if(skill != "Base"){
        profToggle = document.getElementById(skill).checked; //True-False from checkbox.
        expToggle  = document.getElementById(skill + "Exp").checked;
    }
    var modInt = Number(modStat);
    if(profToggle){
        modInt += Number(document.getElementById("ProfBonus").value);
    }
    if(expToggle){
        modInt += Number(document.getElementById("ProfBonus").value);
    }
    if(!profToggle && !expToggle && jackToggle){
        //Activate Jack of All Trades
        modInt += Math.floor(Number(document.getElementById("ProfBonus").value) / 2);
    }
    // Roll the die
    const result = roll(dice);
    const final = result[0] + modInt; //Only ever gets asked for 1d20, can hardcode reference.
    // Update the result element on the page
    const resultElement = document.getElementById("dice-roller-results");
    if(skill.includes("Save")) resultElement.innerHTML += `${stat} Save roll: ${result} + ${modInt}  = <b>${final}</b>!<br>`;
    else resultElement.innerHTML += `${stat} ${skill} roll: ${result} + ${modInt}  = <b>${final}</b>!<br>`;
    // Scroll to the bottom of the log
    resultElement.scrollTop = resultElement.scrollHeight;

    //IMPORTANT ASPECT - SAVING JSON IN BROWSER STORAGE.
    lastRollResult = {'last':final};
    localStorage.setItem('lastRollResult', JSON.stringify(lastRollResult));
}

function getLastRoll() {
    //IMPORTANT ASPECT - RETRIEVING JSON FROM BROWSER STORAGE.
    console.log('Stored roll result in local storage: ', JSON.parse(localStorage.getItem('lastRollResult')).last);
}

function rollDiceAttack(button){
    var thisRow = button.parentNode.parentNode;
    var weapon = thisRow.getElementsByClassName("AttName")[0].value; //Name of the weapon, for log.
    var stat = thisRow.getElementsByClassName("AttStat")[0].value;   //Stat to be added to d20 roll.
    var prof = thisRow.getElementsByClassName("AttProficient")[0].checked; //Whether we have proficiency in attack.
    var rollAdd = thisRow.getElementsByClassName("AttRollAdd")[0].value;   //Additional incidentals to be added.
    var statMod = getStatMod(document.getElementById(stat).value);   //Modifier for the stat.
    if(prof){
        //Need to add proficiency bonus.
        statMod += Number(document.getElementById("ProfBonus").value);
    }
    if(rollAdd != '0')
        var rollString = `1d20 + ${statMod} + ${rollAdd}`; //String to send to rollWithMod, in format "1d20 + <stat+prof> + <incidentals>"
    else
        var rollString = `1d20 + ${statMod}`;
    var printString = rollWithMod(rollString); //String to append to Dice Roller log.
    var logWrite = document.getElementById("dice-roller-results");
    logWrite.insertAdjacentHTML("beforeend", `${weapon} To Hit: ${printString}<br>`);
    logWrite.scrollTop = logWrite.scrollHeight;
}

function rollDiceDamage(button){
    var thisRow = button.parentNode.parentNode;
    var weapon      = thisRow.getElementsByClassName("AttName")[0].value;
    var damage      = thisRow.getElementsByClassName("AttDamage")[0].value;
    var stat        = thisRow.getElementsByClassName("AttStat")[0].value; 
    var rollString  = `${damage} + ${stat}`;
    var printString = rollWithMod(rollString);
    var logWrite = document.getElementById("dice-roller-results");
    logWrite.insertAdjacentHTML("beforeend", `${weapon} Damage: ${printString}<br>`);
    logWrite.scrollTop = logWrite.scrollHeight;
}

function rollDiceSpell(button){
    //Get the string first.
    var logWrite = document.getElementById("dice-roller-results");
    var spellRow = button.parentNode.parentNode;
    var spellName = spellRow.getElementsByClassName("spellName")[0].value;
    var rollText = spellRow.getElementsByClassName("spellRoll")[0].value;
    var rolls = rollText.split(',');
    //console.log(rolls);
    for(var i=0;i<rolls.length;i++){
        logWrite.insertAdjacentHTML("beforeend", `${spellName} roll ` + (i+1) + `: ` + rollWithMod(rolls[i]) + `<br>`);
        logWrite.scrollTop = logWrite.scrollHeight;
    }
}