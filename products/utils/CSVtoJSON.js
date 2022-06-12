const convert = (csv) => {
    const lines = csv.toString().split("\n");
    const headers = lines[0].split(',').map(h => h.replace(/\r/, ''));

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line)
            continue;
        let obj = {};
        const lineArray = line.split(",").map(h => h.replace(/\r/, ''));

        for (const j in headers) {
            const header = headers[j];
            obj = {...obj, [header]: lineArray[j]}
        }

        result.push(obj);
    }

    return result;
}

export default convert;