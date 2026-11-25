import http from 'k6/http';
import { sleep, check } from 'k6';

// SLO босгыг орчны хувьсагчаар өөрчилж болно.
// Анхны босго: p95 < 353ms
const p95Limit = __ENV.SLO_P95 || '353';

export const options = {
    vus: 5,
    duration: '30s',

    // Гүйцэтгэлийн зорилтот үзүүлэлтүүд
    thresholds: {
        http_req_duration: [`p(95)<${p95Limit}`],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    // k6-ийн дадлагын сервер рүү хүсэлт илгээнэ.
    const response = http.get('https://test.k6.io');

    // HTTP статус 200 эсэхийг шалгана.
    check(response, {
        'status 200 байна': (r) => r.status === 200,
    });

    sleep(1);
}
