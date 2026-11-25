import http from 'k6/http';
import { sleep, check } from 'k6';

// Ачааллыг үе шаттайгаар нэмэгдүүлж, эцэст нь бууруулна.
export const options = {
    stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 30 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    // k6-ийн зөвшөөрөгдсөн туршилтын сервер рүү хүсэлт илгээнэ.
    const response = http.get('https://test.k6.io');

    // Сервер амжилттай хариулсан эсэхийг шалгана.
    check(response, {
        'status 200 байна': (r) => r.status === 200,
    });

    // Хүсэлтүүдийн хооронд 1 секунд хүлээнэ.
    sleep(1);
}
