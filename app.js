const themeToggle = document.getElementById('themeToggle');
const motionStrength = document.getElementById('motionStrength');
const motionStrengthValue = document.getElementById('motionStrengthValue');
const generateBtn = document.getElementById('generateBtn');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const statusEl = document.getElementById('status');
const videoPlayer = document.getElementById('videoPlayer');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const historyList = document.getElementById('historyList');

const SAMPLE_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function getValue(id) {
  return document.getElementById(id)?.value;
}

function getChecked(id) {
  return document.getElementById(id)?.checked;
}

function addHistoryItem(item) {
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleString()} — ${item.duration}, ${item.style}, ${item.resolution}, ${item.quality}`;
  historyList.prepend(li);
}

function buildPayload() {
  return {
    prompt: getValue('prompt'),
    duration: getValue('duration'),
    resolution: getValue('resolution'),
    fps: getValue('fps'),
    aspectRatio: getValue('aspectRatio'),
    videoStyle: getValue('videoStyle'),
    colorStyle: getValue('colorStyle'),
    creativity: getValue('creativity'),
    motionStrength: getValue('motionStrength'),
    cameraMovement: getValue('cameraMovement'),
    lighting: getValue('lighting'),
    voiceLanguage: getValue('voiceLanguage'),
    voiceType: getValue('voiceType'),
    voiceStyle: getValue('voiceStyle'),
    speechSpeed: getValue('speechSpeed'),
    subtitleLanguage: getValue('subtitleLanguage'),
    backgroundMusic: getChecked('bgMusic'),
    autoVoiceNarration: getChecked('voiceNarration'),
    subtitleGenerator: getChecked('subtitleGenerator'),
    noiseReduction: getChecked('noiseReduction'),
    format: getValue('format'),
    quality: getValue('quality'),
    hasImageUpload: Boolean(document.getElementById('imageUpload').files[0])
  };
}

function simulateRender(onDone) {
  progressWrap.classList.remove('hidden');
  let progress = 0;
  statusEl.textContent = 'Rendering with AI...';

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 4;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;
    statusEl.textContent = `Generating... ${progress}%`;

    if (progress >= 100) {
      clearInterval(timer);
      statusEl.textContent = 'Generation complete!';
      onDone();
    }
  }, 250);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
});

motionStrength.addEventListener('input', (e) => {
  motionStrengthValue.textContent = e.target.value;
});

generateBtn.addEventListener('click', () => {
  const payload = buildPayload();

  if (!payload.prompt || payload.prompt.trim().length < 6) {
    statusEl.textContent = 'Please provide a clear prompt (at least 6 characters).';
    return;
  }

  progressBar.style.width = '0%';
  videoPlayer.classList.add('hidden');
  downloadBtn.classList.add('hidden');
  shareBtn.classList.add('hidden');

  simulateRender(() => {
    videoPlayer.src = SAMPLE_VIDEO;
    videoPlayer.classList.remove('hidden');
    downloadBtn.href = SAMPLE_VIDEO;
    downloadBtn.classList.remove('hidden');
    shareBtn.classList.remove('hidden');

    addHistoryItem({
      duration: payload.duration,
      style: payload.videoStyle,
      resolution: payload.resolution,
      quality: payload.quality
    });

    console.log('AI video request payload (integrate backend/API here):', payload);
  });
});

shareBtn.addEventListener('click', async () => {
  const message = 'Check out my AI generated video!';
  if (navigator.share) {
    try {
      await navigator.share({ title: 'AI Video', text: message, url: downloadBtn.href });
    } catch {
      statusEl.textContent = 'Share canceled.';
    }
  } else {
    navigator.clipboard.writeText(downloadBtn.href);
    statusEl.textContent = 'Share URL copied to clipboard.';
  }
});
