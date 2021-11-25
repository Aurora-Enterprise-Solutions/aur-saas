export function hideEmail(email) {

    const splitted = email.split('@')
    let part1Start = splitted[0]
    let part1End = part1Start
    const avg = Math.floor(part1Start.length / 3)
    const extra = part1Start.length - avg * 3
    part1Start = part1Start.substring(0, avg)
    part1End = part1End.substring( (avg * 2) + extra, part1End.length)
    const part2 = splitted[1]

    return `${part1Start}...${part1End}@${part2}`

}
