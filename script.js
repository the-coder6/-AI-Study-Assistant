
const form = document.getElementById("promptForm");
const outputSection = document.getElementById("outputSection");
const result = document.getElementById("result");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const topic = document.getElementById("topic").value.trim();
    const task = document.getElementById("task").value;
    const level = document.getElementById("level").value;
    const language = document.getElementById("language").value;
    const length = document.getElementById("length").value;
    const extra = document.getElementById("extra").value.trim();

    if (!topic) {
        alert("Please enter your topic!");
        return;
    }

    const prompt = `
Act as an expert educational AI assistant.

My topic is: ${topic}

Your task is to create: ${task}.

Target learning level: ${level}
Preferred language: ${language}
Content length: ${length}

Instructions:
1. Explain the subject clearly.
2. Use proper headings and subheadings.
3. Include relevant examples.
4. Highlight important points.
5. Make the content educational and accurate.
6. Keep the explanation suitable for the selected learning level.

Additional instructions:
${extra || "Include useful examples and important concepts."}

Please generate the requested educational content in a well-organized format.
`;

    result.value = prompt.trim();
    outputSection.hidden = false;
    message.textContent = "Your prompt has been generated successfully!";

    outputSection.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

document.getElementById("copyBtn").addEventListener("click", async function() {

    try {
        await navigator.clipboard.writeText(result.value);
        message.textContent = "✓ Prompt copied successfully!";
    } catch (error) {
        result.select();
        document.execCommand("copy");
        message.textContent = "✓ Prompt copied!";
    }

});

document.getElementById("chatBtn").addEventListener("click", function() {

    if (!result.value.trim()) {
        message.textContent = "Please generate a prompt first.";
        return;
    }

    const chatURL = "https://chatgpt.com/?q=" +
        encodeURIComponent(result.value);

    window.open(chatURL, "_blank", "noopener,noreferrer");

});
