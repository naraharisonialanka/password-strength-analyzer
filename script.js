
// Get the required HTML elements
const password = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const percentage = document.getElementById("percentage");

const togglePassword = document.getElementById("togglePassword");
const copyPassword = document.getElementById("copyPassword");

const crackTime = document.getElementById("crackTime");
const securityMessage = document.getElementById("securityMessage");
const securityEmoji = document.getElementById("securityEmoji");


// List of password requirements
const requirements = {

    length: value => value.length >= 8,
    uppercase: value => /[A-Z]/.test(value),
    lowercase: value => /[a-z]/.test(value),
    number: value => /[0-9]/.test(value),
    special: value => /[^A-Za-z0-9]/.test(value)

};


// Function to check password strength
function checkPassword() {

    const value = password.value;
    let score = 0;

    // Check which password requirements are completed
    for (let key in requirements) {

        const element = document.getElementById(key);

        if (requirements[key](value)) {

            element.classList.add("valid");
            score++;

        } else {

            element.classList.remove("valid");

        }

    }

    // Calculate password strength percentage
    const percent = score * 20;

    percentage.textContent = percent + "%";
    strengthBar.style.width = percent + "%";


    // Display the default message if password is empty
    if (value.length === 0) {

        strengthBar.style.width = "0%";
        percentage.textContent = "0%";

        crackTime.textContent = "Not Available";

        securityMessage.textContent =
            "Enter a password to analyze its security.";

        securityEmoji.textContent = "🔐";

        return;
    }


    // Display the password strength result
    if (score <= 2) {

        securityMessage.textContent =
            "Weak: Your password needs improvement.";

        securityEmoji.textContent = "😟";
        crackTime.textContent = "Very Short";

    }

    else if (score === 3) {

        securityMessage.textContent =
            "Medium: Your password is getting stronger.";

        securityEmoji.textContent = "🙂";
        crackTime.textContent = "Improve It";

    }

    else if (score === 4) {

        securityMessage.textContent =
            "Strong: Good password security!";

        securityEmoji.textContent = "😊";
        crackTime.textContent = "Longer";

    }

    else {

        securityMessage.textContent =
            "Excellent: All requirements satisfied!";

        securityEmoji.textContent = "😎";
        crackTime.textContent = "Potentially Long";

    }

}


// Check password whenever the user types
password.addEventListener("input", checkPassword);


// Show or hide the entered password
togglePassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

});


// Copy the entered password
copyPassword.addEventListener("click", async function() {

    if (password.value.length === 0) {

        alert("Please enter a password first!");
        return;

    }

    try {

        await navigator.clipboard.writeText(password.value);

        copyPassword.textContent = "✓ Copied!";

        setTimeout(function() {

            copyPassword.textContent = "📋 Copy Password";

        }, 1500);

    }

    catch (error) {

        alert("Unable to copy. Please use a secure browser connection.");

    }

});


// Check the password when the page first loads
checkPassword();
