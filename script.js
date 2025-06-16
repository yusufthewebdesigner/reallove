let toggleIcon = document.getElementById("toggleIcon");
let calcBtn = document.getElementById("calculationButton");
let mainBox = document.getElementById("mainBox");
let outputField = document.getElementById("loveCount");
let loveMessage = document.getElementById("loveMsg");
let actionBtn = document.querySelector(".action");

//
let calculation = (e) => {
  e.preventDefault();
  actionBtn.style.display = "flex";

  let YgenderSelected = document.querySelector('input[name="YGender"]:checked');
  let PgenderSelected = document.querySelector('input[name="PGender"]:checked');

  let yourName = document.getElementById("you").value.toLowerCase().replace(/\s/g, "");
  let partnerName = document.getElementById("partner").value.toLowerCase().replace(/\s/g, "");
  let nameLength = (yourName.length + partnerName.length) * 2;

  if (yourName === "" || partnerName === "" || !YgenderSelected || !PgenderSelected) {
    outputField.innerText = "Fill all the fields up, please!";
  } else if (
    (yourName.match("yusuf") && partnerName.match("eva")) ||
    (yourName.match("eva") && partnerName.match("yusuf"))
  ) {
    outputField.innerText = "100 %";
  } else if (yourName === partnerName) {
    outputField.innerText = "Use different name, please!";
  } else if (nameLength <= 20) {
    outputField.innerText = `${nameLength * 4}` + " %";
  } else if (nameLength <= 50) {
    outputField.innerText = `${Math.floor(nameLength * 1.5)}` + " %";
  } else if (nameLength > 50 && nameLength < 90) {
    outputField.innerText = `${nameLength}` + " %";
  } else if (nameLength >= 90 && nameLength <= 99) {
    outputField.innerText = `${Math.floor(nameLength / 2)}` + " %";
  } else if (nameLength > 99) {
    outputField.innerText = `${Math.ceil(Math.random() * 10 + 80)}` + " %";
  }
  //! Changing Message Color.
  if (outputField.innerText.includes("please")) {
    outputField.style.color = "red";
  } else {
    outputField.style.color = mainBox.classList.contains("darkMode") ? "white" : "black";
  }
  // //! Love Message Based on %.
  if (outputField.innerText.match("%")) {
    let loveValue = +outputField.innerText.replace(/[^\d]/g, "");
    let PartnerGender = PgenderSelected.value;
    // This prompt capitalize each word.
    let partner = document.getElementById("partner").value.toLowerCase().split(" ");
    let PartnerCapital = partner.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    if (loveValue < 50) {
      loveMessage.innerText = `${PartnerCapital} really enjoys spending time with you, you're becoming someone special to ${
        PartnerGender === "Male" ? "him" : "her"
      }.`;
    } else if (loveValue < 70) {
      loveMessage.innerText = `You’ve taken up a big place in ${PartnerCapital}'s heart, and ${
        PartnerGender === "Male" ? "he" : "she"
      } feels so lucky to have you.`;
    } else if (loveValue < 80) {
      loveMessage.innerText = `Every day with you makes ${PartnerCapital} feel more deeply connected and in love!`;
    } else if (loveValue <= 100) {
      loveMessage.innerText = `Your souls were written in the stars long before you met. ${PartnerCapital} needs you forever, and getting your love makes ${
        PartnerGender === "Male" ? "his" : "her"
      } destiny fullfilled!`;
    }
  }
};

//! Function Calling
calcBtn.onclick = calculation;
calcBtn.addEventListener("keydown", () => {
  calculation;
});

toggleIcon.onclick = function () {
  mainBox.classList.toggle("darkMode");
  //! Changing Toogle Icon & Its Color.
  if (toggleIcon.classList.value.match("moon")) {
    toggleIcon.classList.value = "fa-solid fa-sun";
    toggleIcon.style.color = "white";
  } else {
    toggleIcon.classList.value = "fa-solid fa-moon";
    toggleIcon.style.color = "black";
  }
  //! Changing Message Color on Theme Change.
  if (outputField.innerText.includes("please")) {
    outputField.style.color = "red";
  } else {
    outputField.style.color = mainBox.classList.contains("darkMode") ? "white" : "black";
  }
};
//! Copy Feature.
let copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  copyBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Copied`;

  navigator.clipboard.writeText(loveMessage.innerText);
  //! Copy Sound.
  const sound = new Howl({
    src: ["Copy Sound.m4a"],
    volume: 0.8,
  });
  sound.play();

  setTimeout(() => {
    copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
  }, 800);
});
//! Share Feature.
let shareBtn = document.getElementById("share");
let captureArea = document.getElementById("captureArea");

shareBtn.addEventListener("click", async () => {
  document.querySelector("#Ygender").style.display = "none";
  document.querySelector("#Pgender").style.display = "none";
  setTimeout(() => {
    document.querySelector("#Ygender").style.display = "block";
    document.querySelector("#Pgender").style.display = "block";
  }, 2000);

  //! Playing Captureing Sound.
  const sound = new Howl({
    src: ["Screen Capture Sound.mp3"],
    volume: 0.8,
  });
  sound.play();

  //! Takimg & Sharing SS.
  try {
    const element = document.getElementById("captureArea");
    const isDark = mainBox.classList.contains("darkMode");

    // Save original styles
    const originalBackground = element.style.backgroundColor;
    const originalColor = element.style.color;
    // Apply temporary styles
    element.style.backgroundColor = isDark ? "#2f3542" : "white";
    element.style.color = isDark ? "white" : "black";
    //! Take screenshot
    const canvas = await html2canvas(element, {
      scale: 3, // Improve resolution
    });
    // Restore original styles
    element.style.backgroundColor = originalBackground;
    element.style.color = originalColor;

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "screenshot.png", { type: "image/png" });

    const shareData = {
      files: [file],
      // title: "Screenshot",
      // text: "Check out this screenshot!",
    };

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share(shareData);
      // console.log("Screenshot shared successfully");
    } else {
      alert("Sharing files is not supported on this browser.");
    }
  } catch (err) {
    console.error("Error sharing:", err);
  }
});
