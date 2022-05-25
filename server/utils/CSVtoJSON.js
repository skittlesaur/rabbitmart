const convert = (csv) => {
    const lines = csv.toString().split("\n");
    const headers = lines[0].split(',');

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        let obj = {};
        const lineArray = line.split(",");

        for (const j in headers) {
            const header = headers[j];
            obj = {...obj, [header]: lineArray[j]}
        }

        result.push(obj);
    }

    return result;
}

export default convert;