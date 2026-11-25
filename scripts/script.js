import http from 'k6/http';
import { sleep, check } from 'k6';

// Анхны туршилтын тохиргоо: 5 зэрэгцээ хэрэглэгч, 30 секунд
export const options = {
    vus: 5,
    duration: '30s',
};

// Хэрэглэгч бүрийн гүйцэтгэх үйлдэл
export default function () {

    // Зөвшөөрөгдсөн дадлагын сайт руу GET хүсэлт илгээнэ
    const response = http.get('https://test.k6.io');

    // Серверийн хариу 200 эсэхийг шалгана
    check(response, {
        'status 200 байна': (r) => r.status === 200,
    });

    // Дараагийн хүсэлтээс өмнө 1 секунд хүлээнэ
    sleep(1);
}
