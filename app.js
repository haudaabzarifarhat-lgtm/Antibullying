
// Interaksi demo AntiBullying. Tidak mengirim data ke server.
document.addEventListener('DOMContentLoaded', () => {
  const reportForm = document.getElementById('reportForm');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const result = document.getElementById('reportResult');
      result.textContent = 'Simulasi berhasil. Tidak ada data yang dikirim atau disimpan. Untuk laporan sungguhan, hubungi guru BK, wali kelas, orang tua, atau orang dewasa tepercaya.';
      result.classList.add('show');
      reportForm.reset();
    });
  }

  const challengeChecks = [...document.querySelectorAll('.challenge input')];
  if (challengeChecks.length) {
    const update = () => {
      const count = challengeChecks.filter(c => c.checked).length;
      document.getElementById('challengeCount').textContent = `${count} dari ${challengeChecks.length} selesai`;
      document.getElementById('challengeProgress').style.width = `${count / challengeChecks.length * 100}%`;
    };
    challengeChecks.forEach(c => c.addEventListener('change', update));
  }

  const quizArea = document.getElementById('quizArea');
  if (quizArea) {
    const questions = [
      {q:'Apa yang paling tepat menggambarkan perundungan?',a:['Perbedaan pendapat sekali waktu','Perilaku agresif berulang dengan ketimpangan kekuatan','Bermain bersama teman','Memberi kritik dengan sopan'],correct:1,why:'Perundungan umumnya melibatkan perilaku agresif yang berulang dan ketimpangan kekuatan atau posisi.'},
      {q:'Manakah contoh cyberbullying?',a:['Mengerjakan tugas daring','Mengirim pesan dukungan','Menyebarkan hinaan tentang teman melalui media sosial','Mengikuti kelas online'],correct:2,why:'Cyberbullying adalah perundungan yang dilakukan melalui media digital.'},
      {q:'Apa yang sebaiknya dilakukan jika teman bercerita mengalami perundungan?',a:['Menyalahkannya','Menyebarkan ceritanya','Mendengarkan dan mengajak mencari bantuan tepercaya','Mengabaikannya'],correct:2,why:'Dengarkan tanpa menghakimi dan bantu teman menghubungi orang dewasa tepercaya.'},
      {q:'Jika melihat perundungan, tindakan yang lebih aman adalah…',a:['Ikut menertawakan','Merekam lalu menyebarkannya','Mencari bantuan guru atau orang dewasa tepercaya','Menantang pelaku sendirian'],correct:2,why:'Utamakan keselamatan dan mintalah bantuan orang dewasa yang dapat bertindak.'},
      {q:'Apakah meminta bantuan berarti lemah?',a:['Ya','Tidak, meminta bantuan adalah langkah berani','Hanya jika masalah besar','Tidak perlu bantuan siapa pun'],correct:1,why:'Setiap orang berhak mendapat dukungan. Meminta bantuan adalah tindakan positif.'}
    ];
    let current = 0, answers = Array(questions.length).fill(null);
    const prev = document.getElementById('quizPrev'), next = document.getElementById('quizNext');
    const progress = document.getElementById('quizProgress'), progressText = document.getElementById('quizProgressText');
    function render() {
      const q = questions[current];
      progress.style.width = `${(current+1)/questions.length*100}%`;
      progressText.textContent = `Pertanyaan ${current+1} dari ${questions.length}`;
      quizArea.innerHTML = `<h2 class="question-title">${current+1}. ${q.q}</h2><div class="answer-list">${q.a.map((a,i)=>`<label class="answer-option ${answers[current]===i?'selected':''}"><input type="radio" name="answer" value="${i}" ${answers[current]===i?'checked':''}><span>${a}</span></label>`).join('')}</div><div id="quizFeedback"></div>`;
      quizArea.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { answers[current] = Number(input.value); render(); }));
      prev.disabled = current === 0;
      next.textContent = current === questions.length-1 ? 'Lihat hasil' : 'Berikutnya →';
    }
    prev.addEventListener('click', () => { if(current>0){current--;render();} });
    next.addEventListener('click', () => {
      if (answers[current] === null) { alert('Pilih satu jawaban terlebih dahulu.'); return; }
      if (current < questions.length-1) { current++; render(); }
      else showResult();
    });
    function showResult() {
      const score = answers.reduce((sum,a,i)=>sum+(a===questions[i].correct?1:0),0);
      quizArea.innerHTML = `<div class="quiz-result-score">${score}/${questions.length}</div><h2 class="question-title">Terima kasih sudah belajar!</h2><p>Berikut pembahasan untuk setiap pertanyaan:</p>${questions.map((q,i)=>`<div class="explanation"><b>${i+1}. ${q.a[q.correct]}</b><p>${q.why}</p></div>`).join('')}`;
      document.querySelector('.quiz-controls').style.display = 'none';
      progress.style.width = '100%'; progressText.textContent = 'Kuis selesai';
      const result = document.getElementById('quizResult');
      result.textContent = score >= 4 ? 'Bagus! Terus sebarkan sikap peduli dan saling menghargai.' : 'Terus belajar. Kamu bisa mengulang kuis setelah membaca materi edukasi.';
      result.classList.add('show');
    }
    render();
  }
});
