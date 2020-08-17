const Database = require('./db')
const createProffy = require('./createProffy')

Database.then( async (db) => {
    // Inserir dados

    proffyValue = {
        name: "Dieisson Narde",
        avatar: "https://imagem.com",
        whatsapp: "8984938",
        bio: "fera"
    }

    classValue = {
        subject: "1",
        cost: "20",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 2,
            time_from: 520,
            time_to: 1920
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado proffy
    // e trazer junto os dados do proffy
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horario que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horario do time_from (8h) precisa ser antes ou igual ao horario solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    // console.log(selectClassesSchedules)
})