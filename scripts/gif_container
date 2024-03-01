// script.js

import { sortData } from "./csvReader.js";
import { saveSummaryPercentageForWeapons } from "./csvReader.js";

// Wrap the code inside an async function
console.log(
  sortData(["Vertical Spinner", "Drum"], ["2WD", "4WD"], ["30lb", "3lb"])
);

console.log(
  saveSummaryPercentageForWeapons(
    ["Vertical Spinner", "Drum"],
    ["2WD", "4WD"],
    ["30lb", "3lb"]
  )
);

//Number generator
function generateRandomNumber() {
  return (Math.random() * 10).toFixed(4) / 10;
}
// JavaScript to handle dropdown change events
document
  .getElementById("car1Dropdown")
  .addEventListener("change", function () {
    var selectedGif = this.value;
    document.getElementById("car1").src = selectedGif;
  });

document
  .getElementById("car2Dropdown")
  .addEventListener("change", function () {
    var selectedGif = this.value;
    document.getElementById("car2").src = selectedGif;
  });

// JavaScript to handle start button click event
document
  .getElementById("startButton")
  .addEventListener("click", async function () {
    var car1SelectedGif = document.getElementById("car1Dropdown").value;
    var car2SelectedGif = document.getElementById("car2Dropdown").value;

    if (car1SelectedGif === "" || car2SelectedGif === "") {
      alert("Please select both Battlebot 1 and Battlebot 2.");
    } else {
      // Fetch the CSV file from the link
      // var csvUrl = "http://localhost:8080/data/average.csv"; // Adjust the URL based on your local server configuration
      // parseCSVFromLink(csvUrl)
      //   .then((weaponAverages) => {
      //     // Find the average values for the selected weapons
      //     var average1, average2;
      //     for (var i = 0; i < weaponAverages.length; i++) {
      //       if (weaponAverages[i].Weapon === car1SelectedGif) {
      //         average1 = parseFloat(weaponAverages[i].Average);
      //       } else if (weaponAverages[i].Weapon === car2SelectedGif) {
      //         average2 = parseFloat(weaponAverages[i].Average);
      //       }
      //     }

      //     // Now you have the average values for the selected weapons (average1 and average2)
      //     console.log("Average for 1:", average1);
      //     console.log("Average for 2:", average2);

      //     // Perform any further actions with the average values if needed
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching and parsing CSV file:", error);
      //   });
      const weapon1 = getWeaponName(car1SelectedGif).toString();
      console.log("1", weapon1);
      const weapon2 = getWeaponName(car2SelectedGif).toString();
      console.log("2", weapon2);

      try {
        // Call saveSummaryPercentageForWeapons to get summary percentages
        const result = await saveSummaryPercentageForWeapons(
          [weapon1, weapon2],
          ["2WD", "4WD"],
          ["30lb", "3lb"]
        );

        console.log("Summary Percentage for perc 111:", result.perc1);
        console.log("Summary Percentage for perc 222:", result.perc2);

        // Calculate win status for each bot
        var average1 = result.perc1;
        var average2 = result.perc2;
      } catch (error) {
        console.error("Error:", error);
      }

      console.log(
        " average for perc 1:",
        average1,
        "average for perc 1:",
        average2
      );

      var win1, win2;
      do {
        // Generate random numbers for chance 1 and chance 2
        var chance1 = generateRandomNumber();
        var chance2 = generateRandomNumber();

        console.log("Chance 1:", chance1);
        console.log("Chance 2:", chance2);

        win1 = chance1 > average1 ? 1 : 0;
        win2 = chance2 > average2 ? 1 : 0;

        console.log("Win status for Bot 1:", win1);
        console.log("Win status for Bot 2:", win2);
      } while ((win1 === 1 && win2 === 1) || (win1 === 0 && win2 === 0));

      // Reset animation by resetting the image positions and removing existing animations
      document.querySelector(".car1").style.left = "-200px";
      document.querySelector(".car2").style.right = "-200px";
      document.querySelector(".car1").style.animation =
        "moveRight1 3.5s linear forwards";
      document.querySelector(".car2").style.animation =
        "moveLeft2 3.5s linear forwards";
      document.querySelector(".effect").style.animation =
        "appearAndDisappear 0.3s linear 0.6s forwards, appearAndDisappear 0.3s linear 2s forwards";

      if (win1 === 1) {
        // Bot 1 wins, update animation for Bot 1
        document.querySelector(".car1").style.animation =
          "moveRight2 3.5s linear forwards";
        document.querySelector(".car2").style.animation =
          "moveLeft2 3.5s linear forwards";
        document.getElementById("winBox").textContent =
          "Winning Weapon: " + getWeaponName(car1SelectedGif);
      } else {
        // Bot 2 wins, update animation for Bot 2
        document.querySelector(".car1").style.animation =
          "moveRight1 3.5s linear forwards";
        document.querySelector(".car2").style.animation =
          "moveLeft1 3.5s linear forwards";
        document.getElementById("winBox").textContent =
          "Winning Weapon: " + getWeaponName(car2SelectedGif);
      }

      // Hide the Start Animation button and dropdown menus
      document.getElementById("startButton").style.display = "none";
      document.getElementById("car1Dropdown").style.display = "none";
      document.getElementById("car2Dropdown").style.display = "none";

      //Weapon name
      function getWeaponName(filePath) {
        // Split the file path by backslash ("\") and get the last part
        var parts = filePath.split("\\");
        var weaponName = parts[parts.length - 1].replace(".gif", ""); // Remove the file extension if needed
        return weaponName.replace("final ", ""); // Remove "final" from the weapon name
      }
      // Listen for animation end event on one of the elements
      document
        .querySelector(".car1")
        .addEventListener("animationend", function () {
          // Show the Start Animation button and dropdown menus
          document.getElementById("startButton").style.display =
            "inline-block";
          document.getElementById("car1Dropdown").style.display =
            "inline-block";
          document.getElementById("car2Dropdown").style.display =
            "inline-block";
          // Reset animation properties
          document.querySelector(".car1").style.animation = "";
          document.querySelector(".car2").style.animation = "";
          document.querySelector(".effect").style.animation = "";
        });
    }
  });

