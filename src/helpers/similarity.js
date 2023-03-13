
export function similarity(s1, s2) {
    let m = 0;
    let t = 0;
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()
    let l = Math.max(s1.length, s2.length);
    let s1Matches = new Array(s1.length);
    let s2Matches = new Array(s2.length);
    let range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;

    for (let i = 0; i < s1.length; i++) {
        let low = (i >= range) ? i - range : 0;
        let high = (i + range <= s2.length - 1) ? (i + range) : (s2.length - 1);

        for (let j = low; j <= high; j++) {
            if (s2Matches[j]) continue;
            if (s1[i] !== s2[j]) continue;
            s1Matches[i] = true;
            s2Matches[j] = true;
            m++;
            break;
        }
    }

    if (m === 0) return 0;

    for (let i = 0; i < s1.length; i++) {
        if (s1Matches[i] === true) continue;
        t++;
    }

    for (let i = 0; i < s2.length; i++) {
        if (s2Matches[i] === true) continue;
        t++;
    }

    return (m / s1.length + m / s2.length + (m - t / 2) / m) / 3;
}