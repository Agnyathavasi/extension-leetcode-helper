const outputDiv = document.getElementById("output");
const thinkBtn = document.getElementById("btn-think");
const solveBtn = document.getElementById("btn-solve");
const loaderDiv = document.getElementById("loader");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const isValidLeetCode =
    /^https:\/\/leetcode\.com\/problems\/[^\/]+(?:\/description)?\/?$/.test(
      tab.url
    );

  if (!isValidLeetCode) {
    thinkBtn.style.display = "none";
    solveBtn.style.display = "none";
    outputDiv.innerText =
      "Note: This extension only works on LeetCode problem pages.";
  } else {
    thinkBtn.onclick = () => sendToAI("insight");
    solveBtn.onclick = () => sendToAI("solution");
  }
});

async function sendToAI(type) {
  loaderDiv.style.display = "block";
  outputDiv.innerText = "";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async (type) => {
      const title =
        document.querySelector('div[data-key="title"]')?.innerText ||
        document.title;
      const description =
        document.querySelector('[data-key="description-content"]')?.innerText ||
        document.querySelector(".content__u3I1.question-content__JfgR")
          ?.innerText;

      const prompt =
        type === "insight"
          ? `Give me high-level thought-pattern steps to solve the problem:\n\n${title}\n\n${description}`
          : `Give me the full solution to the problem in JS:\n\n${title}\n\n${description}`;

      const response = await fetch("<YOUR_AI_MODEL_URL>", {
        method: "POST",
        headers: {
          Authorization: "Bearer <YOUR_AI_AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await response.json();
      const answer = result.choices?.[0]?.message?.content || "No response";
      chrome.runtime.sendMessage({ answer });
    },
    args: [type],
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

chrome.runtime.onMessage.addListener((msg) => {
  loaderDiv.style.display = "none";
  const html = msg.answer.split("```");
  let code = `<pre><code>${escapeHtml(msg.answer)}</code></pre>`;
  if (html.length === 3) {
    code = html[0] + "<pre><code>" + html[1] + "</code></pre>" + html[2];
  }

  outputDiv.innerHTML = code;
});
