export function setupFAQToggle(faqContainer) {

    const faqItems = faqContainer.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        answer.style.display = 'none';

        questionButton.addEventListener('click', () => {

            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
            icon.textContent = isVisible ? '+' : '-';
        });
    });
}