const USERNAME = "sfredrickson";
const PASSWORD = "Bush4Lyfe";

const emailThreads = [
    {
        header: "Thread 1: Mr. G",
        entries: [
            { date: "Oct 12 1994", content: "<b>misterg</b>\n babe bathroom upstairs in 10" },
            { date: "Oct 24 1994", content: "<b>misterg</b>\n babe bathroom upstairs in 10" },
            { date: "Oct 30 1994", content: "<b>misterg</b>\n babe bathroom upstairs in 10" },
            { date: "Nov 05 1994", content: "<b>misterg</b>\n how beautiful saw you walk in today, couldn't stop\n<b>plank.s</b>\n oh shut up! you gross old man HAHA\n<b>misterg</b>\n thats not what you were calling me last night!\n<b>plank.s</b>\n OMG what if people reads these\n<b>misterg</b>\n Okay fine meet me in the janitors closet then\n<b>plank.s</b>\n Fine. I will be there in 5." }
        ]
    },
    {
        header: "Thread 2: With Mentis",
        entries: [
            { date: "Oct 15 1994", content: "<b>plank.s</b>\n I am calling in on that favors, I pushed and prodded and you got your girl. I have been nothing but a strong contributer to our mission, so I ask will you take the boy?" },
            { date: "Oct 25 1994", content: "<b>mentis</b>\n The boy? What do you mean?\n<b>plank.s</b>\n The son, dammit. Ben. I want Leo to sell the arcade. He never will with Ben. Plus the sadness of his mother's passing reeks off of him. I am his family now, I'm all he will have." },
            { date: "Nov 05 1994", content: "<b>mentis</b>\n Sandra,\n I will remind you you are a member of this order and as a disciple of the Great One you will do what is asked of you, regardless of compensation. I am a Purgator you are but a devotee, you do not get to ask for favors. However as a generous and giving person I will grant this, not because you ask but because I was going to anyways for reasons you do not get to know.\n\n I warn you; do not speak out of turn again lest you face our wrath\n M" }
        ]
    }
];

let authenticated = false;

function authenticate(cmd) {
    const [inputUsername, inputPassword] = cmd.split(':');
    if (inputUsername === USERNAME && inputPassword === PASSWORD) {
        authenticated = true;
        return "Authentication successful.\nEnter 'list' to view email threads.";
    } else {
        return "Incorrect username or password. Please try again.";
    }
}

function listThreads() {
    let output = "Email Threads:\n";
    emailThreads.forEach((thread, index) => {
        output += `${index + 1}. ${thread.header}\n`;
    });
    return output;
}

function openThread(threadNum) {
    if (threadNum >= 1 && threadNum <= emailThreads.length) {
        const thread = emailThreads[threadNum - 1];
        let output = `${thread.header}\n\n`;
        thread.entries.forEach(entry => {
            output += `${entry.date}\n${entry.content}\n\n`;
        });
        return output;
    } else {
        return "Invalid thread number.";
    }
}

document.getElementById("cmd-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const cmd = event.target.value.trim();
        let output = "";

        if (!authenticated) {
            output = authenticate(cmd);
        } else {
            if (cmd === "list") {
                output = listThreads();
            } else if (cmd.startsWith("open")) {
                const threadNum = parseInt(cmd.split(" ")[1]);
                output = openThread(threadNum);
            } else {
                output = "Invalid command.";
            }
        }

        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML += `\n> ${cmd}\n${output}\n`;
        event.target.value = "";
        outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll to the bottom
    }
});
