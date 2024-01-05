import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { produce } from "immer"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "firebase/auth"
import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc, orderBy, limit, endAt, serverTimestamp } from "firebase/firestore"
// eslint-disable-next-line
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"
// eslint-disable-next-line
import { auth, firestore, storage } from "./firebase.config"

export const useStore = create(devtools((set, get) => ({
    auth: null,
    user: null,
    order: null,
    product: null,
    task: null,
    work: null,
    category: null,
    producer: null,
    article: null,
    parameter: null,
    loadingMini: false,
    loading: true,
    error: "",
    numberPay: 0,
    filter: {
        user: {0: "id", 1: "email", 2: "telefon", 3: "imie", 4: "nazwisko", 5: "createdAt"},
        product: {0: "id", 1: "nazwa", 2: "kategoria1", 3: "cenabrutto", 4: "cenanetto", 5: "createdAt"},
        order: {0: "id", 1: "WZ", 2: "FV", 3: "dostawa", 4: "zaplata", 5: "createdAt"},
        task: {0: "id", 1: "NR", 2: "nazwa", 3: "miejsce", 4: "wojewodztwo", 5: "createdAt"},
        work: {0: "id", 5: "createdAt"},
        category: {0: "id", 1: "nazwa", 2: "kategoria", 5: "createdAt"},
        producer: {0: "id", 1: "nazwa", 5: "createdAt"},
        article: {0: "id", 1: "nazwa", 2: "opis", 5: "createdAt"},
        parameter: {0: "id", 1: "nazwa", 5: "createdAt"}
    },
    arrayFilter: {
        user : [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Status",
                value: "status",
            },
            {
                name: "Email",
                value: "email",
            },
            {
                name: "Telefon",
                value: "telefon",
            },
            {
                name: "Imię",
                value: "imie",
            },
            {
                name: "Nazwisko",
                value: "nazwisko",
            },
            {
                name: "Firma",
                value: "isFirma",
            },
            {
                name: "Nazwa",
                value: "nazwa",
            },
            {
                name: "Nip",
                value: "nip",
            },
            {
                name: "Ulica i numer",
                value: "ulicainumer",
            },
            {
                name: "Miejscowość",
                value: "miejscowosc",
            },
            {
                name: "Kod pocztowy",
                value: "kodpocztowy",
            },
            // {
            //     name: "Data Dodania",
            //     value: "createdAt",
            // },
            // {
            //     name: "Data Edycji",
            //     value: "editedAt",
            // },
        ],
        product: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Status",
                value: "status",
            },
            {
                name: "Nazwa",
                value: "nazwa",
            },
            {
                name: "Zdjęcie",
                value: "zdjecie",
            },
            {
                name: "Kategoria 1",
                value: "kategoria1",
            },
            {
                name: "Kategoria 2",
                value: "kategoria2",
            },
            {
                name: "Kategoria 3",
                value: "kategoria3",
            },
            {
                name: "Kategoria 4",
                value: "kategoria4",
            },
            {
                name: "Producent",
                value: "producent",
            },
            {
                name: "Seria",
                value: "seria",
            },
            {
                name: "Index",
                value: "index",
            },
            {
                name: "Dostawca",
                value: "dostawca",
            },
            {
                name: "Cena netto",
                value: "cenanetto",
            },
            {
                name: "Cena brutto",
                value: "cenabrutto",
            },
            {
                name: "Magazyn stan",
                value: "magazynstan",
            },
            {
                name: "Magazyn adres",
                value: "magazynadres",
            },
            {
                name: "Miara",
                value: "miara",
            },
            {
                name: "Opis",
                value: "opis",
            },
            {
                name: "Powiązania",
                value: "powiazania",
            },
            // {
            //     name: "Data Dodania",
            //     value: "createdAt",
            // },
            // {
            //     name: "Data Edycji",
            //     value: "editedAt",
            // },
        ],
        order: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Użytkownik",
                value: "user",
            },
            {
                name: "Status",
                value: "status",
            },
            {
                name: "Dostawa",
                value: "dostawa",
            },
            {
                name: "Zapłata",
                value: "zaplata",
            },
            {
                name: "FV",
                value: "FV",
            },
            {
                name: "WZ",
                value: "WZ",
            },
            {
                name: "Imię",
                value: "kurierimie",
            },
            {
                name: "Nazwisko",
                value: "kuriernazwisko",
            },
            {
                name: "Ulica i numer",
                value: "kurierulicainumer",
            },
            {
                name: "Miejscowość",
                value: "kuriermiejscowosc",
            },
            {
                name: "Kod Pocztowy",
                value: "kurierkodpocztowy",
            },
            {
                name: "Paczkomat",
                value: "paczkomat",
            },
            {
                name: "FV Nazwa",
                value: "fakturanazwa",
            },
            {
                name: "FV Nip",
                value: "fakturanip",
            },
            {
                name: "FV Ulica i numer",
                value: "fakturaulicainumer",
            },
            {
                name: "FV Miejscowość",
                value: "fakturamiejscowosc",
            },
            {
                name: "FV Kod Pocztowy",
                value: "fakturakodpocztowy",
            },
            {
                name: "Koszt",
                value: "koszt",
            },
            // {
            //     name: "Data Dodania",
            //     value: "createdAt",
            // },
            // {
            //     name: "Data Edycji",
            //     value: "editedAt",
            // },
        ],
        task: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Nazwa",
                value: "nazwa"
            },
            {
                name: "NR",
                value: "NR"
            },
            {
                name: "Miejsce",
                value: "miejsce"
            },
            {
                name: "Województwo",
                value: "wojewodztwo"
            },
        ],
        work: [
            {
                name: "Id",
                value: "id"
            },
        ],
        category: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Nazwa",
                value: "nazwa"
            },
            {
                name: "Kategoria",
                value: "kategoria"
            },
            {
                name: "Kategoria 1",
                value: "kategoria1"
            },
            {
                name: "Kategoria 2",
                value: "kategoria2"
            },
            {
                name: "Kategoria 3",
                value: "kategoria3"
            },
        ],
        producer: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Nazwa",
                value: "nazwa"
            },
        ],
        article: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Nazwa",
                value: "nazwa"
            },
            {
                name: "Opis",
                value: "opis"
            },
        ],
        parameter: [
            {
                name: "Id",
                value: "id"
            },
            {
                name: "Nazwa",
                value: "nazwa"
            },
        ],
    },

    fetch: async () => {
        try {
          set({ loading: true, error: "" })
      
          if(!auth.currentUser) {
            set({ loading: false, auth: null, user: null, order: null, product: null, category: null, producer: null, article: null, parameter: null, task: null })
          }
          else {
            let docsAuth = await getDocs(query(collection(firestore, "user"), where("id", "==", auth.currentUser.uid)))
            let docsUser = await getDocs(query(collection(firestore, "user"), orderBy("createdAt", "desc")))
            let docsOrder = await getDocs(query(collection(firestore, "order")), orderBy("createdAt", "desc"))
            let docsProduct = await getDocs(query(collection(firestore, "product"), orderBy("createdAt", "desc")))
            let docsCategory = await getDocs(query(collection(firestore, "category"), orderBy("nazwa", "asc")))
            let docsProducer = await getDocs(query(collection(firestore, "producer"), orderBy("nazwa", "asc")))
            let docsArticle = await getDocs(query(collection(firestore, "article"), orderBy("createdAt", "desc")))
            let docsParameter = await getDocs(query(collection(firestore, "parameter"), orderBy("nazwa", "asc")))
            let docsTask = await getDocs(query(collection(firestore, "task")), orderBy("createdAt", "desc"))
            let docsWork = await getDocs(query(collection(firestore, "work")), orderBy("createdAt", "desc"))

            // let dataCategory = null
            // if(localStorage.getItem('category')) {
            //     dataCategory = JSON.parse(localStorage.getItem('category'))
            //     console.log("bezpytania")
            // }
            // else {
            //     let docsCategory = await getDocs(query(collection(firestore, "category"), orderBy("nazwa", "asc")))
            //     dataCategory = docsCategory.docs.map((doc) => ({ ...doc.data() }))
            //     localStorage.setItem('category', JSON.stringify(dataCategory))
            //     console.log("pytanie")
            // }
      
            let dataAuth = docsAuth.docs[0].data()
            let dataUser = docsUser.docs.map((doc) => ({ ...doc.data() }))
            let dataOrder = docsOrder.docs.map((doc) => ({ ...doc.data() }))
            let dataProduct = docsProduct.docs.map((doc) => ({ ...doc.data() }))
            let dataCategory = docsCategory.docs.map((doc) => ({ ...doc.data() }))
            let dataProducer = docsProducer.docs.map((doc) => ({ ...doc.data() }))
            let dataArticle = docsArticle.docs.map((doc) => ({ ...doc.data() }))
            let dataParameter = docsParameter.docs.map((doc) => ({ ...doc.data() }))
            let dataTask = docsTask.docs.map((doc) => ({ ...doc.data() }))
            let dataWork = docsWork.docs.map((doc) => ({ ...doc.data() }))
      
            set({ loading: false, auth: dataAuth, user: dataUser, order: dataOrder, product: dataProduct, category: dataCategory, producer: dataProducer, article: dataArticle, parameter: dataParameter, task: dataTask, work: dataWork })
          }
        } 
        catch (error) {
            set({ loading: false, error: `fetch/${error.code}` })
        }
    },

    login: async (event) => {
        try {
            set({ loading: true, error: "" })

            await signInWithEmailAndPassword(auth, event.email, event.password)

            let docsAuth = await getDocs(query(collection(firestore, "user"), where("id", "==", auth.currentUser.uid)))
            let dataAuth = docsAuth.docs[0].data()

            if(dataAuth.status !== "admin") {
                await signOut(auth)
                return set({ loading: false, error: `Nie jesteś administratorem!` })
            }

            let docsUser = await getDocs(query(collection(firestore, "user"), orderBy("createdAt", "desc")))
            let docsOrder = await getDocs(query(collection(firestore, "order")), orderBy("createdAt", "desc"))
            let docsProduct = await getDocs(query(collection(firestore, "product"), orderBy("createdAt", "desc")))
            let docsCategory = await getDocs(query(collection(firestore, "category"), orderBy("nazwa", "asc")))
            let docsProducer = await getDocs(query(collection(firestore, "producer"), orderBy("nazwa", "asc")))
            let docsArticle = await getDocs(query(collection(firestore, "article"), orderBy("createdAt", "desc")))
            let docsParameter = await getDocs(query(collection(firestore, "parameter"), orderBy("nazwa", "asc")))
            let docsTask = await getDocs(query(collection(firestore, "task")), orderBy("createdAt", "desc"))
            let docsWork = await getDocs(query(collection(firestore, "work")), orderBy("createdAt", "desc"))
      
            let dataUser = docsUser.docs.map((doc) => ({ ...doc.data() }))
            let dataOrder = docsOrder.docs.map((doc) => ({ ...doc.data() }))
            let dataProduct = docsProduct.docs.map((doc) => ({ ...doc.data() }))
            let dataCategory = docsCategory.docs.map((doc) => ({ ...doc.data() }))
            let dataProducer = docsProducer.docs.map((doc) => ({ ...doc.data() }))
            let dataArticle = docsArticle.docs.map((doc) => ({ ...doc.data() }))
            let dataParameter = docsParameter.docs.map((doc) => ({ ...doc.data() }))
            let dataTask = docsTask.docs.map((doc) => ({ ...doc.data() }))
            let dataWork = docsWork.docs.map((doc) => ({ ...doc.data() }))

            set({ loading: false, auth: dataAuth, user: dataUser, order: dataOrder, product: dataProduct, category: dataCategory, producer: dataProducer, article: dataArticle, parameter: dataParameter, task: dataTask, work: dataWork })
        }
        catch (error) {
            switch (error.code) {
                case "auth/invalid-email": return set({ loading: false, error: `Niepoprawny email!` })
                case "auth/user-not-found": return set({ loading: false, error: `Nieodnaleziono użytkownika!` })
                case "auth/wrong-password": return set({ loading: false, error: `Niepoprawne hasło!` })
                case "auth/too-many-requests": return set({ loading: false, error: `Za dużo prób logowania, spróbuj później!` })
                case "auth/network-request-failed": return set({ loading: false, error: `Brak połączenia internetowego!` })
                default: return set({ loading: false, error: `login/${error.code}` })
            }
        }
    },

    logout: async () => {
        try {
            set({ loading: true, error: "" })

            await signOut(auth)

            set({ loading: false, auth: null, user: null, order: null, product: null, category: null, producer: null, article: null, parameter: null })
        }
        catch (error) {
            set({ loading: false, error: `logout/${error.code}` })
        }
    },



    filterSet: (type, event, value) => {
        set(produce((state) => { state.filter[type][event] = value }))
    },

    loadingMiniSet: (event) => {
        set(produce((state) => { state.loadingMini = event }))
    },





    update: async (event) => {
        try {
            set({ loading: true, error: "" })

            if(event.doc === "product") {
                const metadata = { contentType: 'image/jpeg' }
                let arrayZdjecie = []
    
                if(event.file[0]) {
                    const storageRef0 = ref(storage, `images/${event.file[0].name}`)
                    const uploadTask0 = await uploadBytes(storageRef0, event.file[0], metadata)
                    const uploadUrl0 = await getDownloadURL(uploadTask0.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl0]
                }
    
                if(event.file[1]) {
                    const storageRef1 = ref(storage, `images/${event.file[1].name}`)
                    const uploadTask1 = await uploadBytes(storageRef1, event.file[1], metadata)
                    const uploadUrl1 = await getDownloadURL(uploadTask1.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl1]
                }
    
                if(event.file[2]) {
                    const storageRef2 = ref(storage, `images/${event.file[2].name}`)
                    const uploadTask2 = await uploadBytes(storageRef2, event.file[2], metadata)
                    const uploadUrl2 = await getDownloadURL(uploadTask2.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl2]
                }
    
                if(event.file[3]) {
                    const storageRef3 = ref(storage, `images/${event.file[3].name}`)
                    const uploadTask3 = await uploadBytes(storageRef3, event.file[3], metadata)
                    const uploadUrl3 = await getDownloadURL(uploadTask3.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl3]
                }
    
                if(event.file[4]) {
                    const storageRef4 = ref(storage, `images/${event.file[4].name}`)
                    const uploadTask4 = await uploadBytes(storageRef4, event.file[4], metadata)
                    const uploadUrl4 = await getDownloadURL(uploadTask4.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl4]
                }
    
                if(event.file) {
                    // await updateDoc(doc(firestore, event.doc, event.id), { ...event.data, zdjecie: arrayZdjecie, editedAt: serverTimestamp()})
                    return set({ loading: false, [event.doc]: get()[event.doc].map(e => e.id === event.id ? {...event.data, zdjecie: arrayZdjecie, editedAt: serverTimestamp()} : e)})
                }
                else {
                    // await updateDoc(doc(firestore, event.doc, event.id), { ...event.data, editedAt: serverTimestamp()})
                    return set({ loading: false, [event.doc]: get()[event.doc].map(e => e.id === event.id ? {...event.data, editedAt: serverTimestamp()} : e)})
                }
            }
            else if(event.doc === "task") {
                let zlecenie
                (event.data.isZlecenie === "true" || event.data.isZlecenie === true) ? zlecenie = true : zlecenie = false

                // await updateDoc(doc(firestore, event.doc, event.id), { ...event.data, isZlecenie: zlecenie, editedAt: serverTimestamp() })
                set({ loading: false, [event.doc]: get()[event.doc].map(e => e.id === event.id ? {...event.data, isZlecenie: zlecenie, editedAt: serverTimestamp() } : e)})

                // //MAIL
                // let mailid = doc(collection(firestore, "mail"))
                // await setDoc(doc(firestore, "mail", mailid.id), {to: event.email, message: {subject: "Zweryfikowaliśmy Twoje zlecenie", 
                //     html:`Witaj,<br>

                //     Twoje zlecenie zostało zweryfikowane!<br>
                
                //     Numer zlecenia: ${event.data.NR}<br>
                //     Sprawdź za jakiś czas oferty instalatorów!<br><br>
                
                //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
                
                //     Dziękujemy,<br><br>
                
                //     Zespół Elektroteka.pl`,
                // }})
            }
            else {
                // await updateDoc(doc(firestore, event.doc, event.id), { ...event.data, editedAt: serverTimestamp() })
                set({ loading: false, [event.doc]: get()[event.doc].map(e => e.id === event.id ? {...event.data, editedAt: serverTimestamp() } : e)})

                // if(event.doc === "order" && event.data.faktura === true && event.data.status === "zakończone") {
                //     //MAIL
                //     let mailid = doc(collection(firestore, "mail"))
                //     await setDoc(doc(firestore, "mail", mailid.id), {to: event.email, message: {subject: "Dostępna nowa faktura", 
                //         html:`Witaj,<br>
                    
                //         Numer zamówienia: ${event.data.NR}<br>
                //         W zakładce dokumenty jest dostępna nowa faktura!<br><br>
                    
                //         Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
                    
                //         Dziękujemy,<br><br>
                    
                //         Zespół Elektroteka.pl`,
                //     }})
                // }

                // if(event.doc === "order" && event.data.status === "zapłacone") {
                //     //MAIL
                //     let mailid = doc(collection(firestore, "mail"))
                //     await setDoc(doc(firestore, "mail", mailid.id), {to: event.email, message: {subject: "Potwierdzenie zapłaty", 
                //         html:`Witaj,<br>
                    
                //         Numer zamówienia: ${event.data.NR}<br>
                //         Twoje zamówienie zostało opłacone w ciągu 24h wyślemy towar!<br><br>
                    
                //         Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
                    
                //         Dziękujemy,<br><br>
                    
                //         Zespół Elektroteka.pl`,
                //     }})
                // }
            }
        }
        catch (error) {
            console.log(error)
            set({ loading: false, error: `${event.doc}/update/${error.code}` })
        }
    },

    delete: async (event) => {
        try {
            set({ loading: true, error: "" })
            // await deleteDoc(doc(firestore, event.doc, event.id))
            set({ loading: false, [event.doc]: [...get()[event.doc].filter(e => e.id !== event.id)]})
        }
        catch (error) {
            set({ loading: false, error: `${event.doc}/delete/${error.code}` })
        }
    },

    create: async (event) => {
        try {
            set({ loading: true, error: "" })
            const id = doc(collection(firestore, event.doc))

            if(event.doc === "product") {
                const metadata = { contentType: 'image/jpeg' }
                let arrayZdjecie = []
    
                if(event.file[0]) {
                    const storageRef0 = ref(storage, `images/${event.file[0].name}`)
                    const uploadTask0 = await uploadBytes(storageRef0, event.file[0], metadata)
                    const uploadUrl0 = await getDownloadURL(uploadTask0.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl0]
                }
    
                if(event.file[1]) {
                    const storageRef1 = ref(storage, `images/${event.file[1].name}`)
                    const uploadTask1 = await uploadBytes(storageRef1, event.file[1], metadata)
                    const uploadUrl1 = await getDownloadURL(uploadTask1.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl1]
                }
    
                if(event.file[2]) {
                    const storageRef2 = ref(storage, `images/${event.file[2].name}`)
                    const uploadTask2 = await uploadBytes(storageRef2, event.file[2], metadata)
                    const uploadUrl2 = await getDownloadURL(uploadTask2.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl2]
                }
    
                if(event.file[3]) {
                    const storageRef3 = ref(storage, `images/${event.file[3].name}`)
                    const uploadTask3 = await uploadBytes(storageRef3, event.file[3], metadata)
                    const uploadUrl3 = await getDownloadURL(uploadTask3.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl3]
                }
    
                if(event.file[4]) {
                    const storageRef4 = ref(storage, `images/${event.file[4].name}`)
                    const uploadTask4 = await uploadBytes(storageRef4, event.file[4], metadata)
                    const uploadUrl4 = await getDownloadURL(uploadTask4.ref)
                    arrayZdjecie = [...arrayZdjecie, uploadUrl4]
                }
    
                // await setDoc(doc(firestore, event.doc, id.id), { ...event.data, id: id.id, powiazania: [], parametry: [], zdjecie: arrayZdjecie, createdAt: serverTimestamp() })
                return set({ loading: false, [event.doc]: [...get()[event.doc], { ...event.data, id: id.id, powiazania: [], parametry: [], zdjecie: arrayZdjecie, createdAt: serverTimestamp() }]})
            }
            else {
                // await setDoc(doc(firestore, event.doc, id.id), { ...event.data, id: id.id, createdAt: serverTimestamp() })
                set({ loading: false, [event.doc]: [...get()[event.doc], { ...event.data, id: id.id, createdAt: serverTimestamp() }]}) 
            }    
        }
        catch (error) {
            set({ loading: false, error: `${event.doc}/create/${error.code}` })
        }
    },

    download: async (event) => {
        try {
          set({ loadingMini: true, error: "" })
      
          let document = await getDocs(query(collection(firestore, event), orderBy("createdAt", "desc")))
          let data = document.docs.map((doc) => ({ ...doc.data() }))

          set({ loadingMini: false, [event]: data })
        } 
        catch (error) {
            set({ loadingMini: false, error: `${event}/download/${error.code}` })
        }
    },







    reduceAuthCartProduktyBruttoNOPRICE: () => {
        return get().auth.koszyk.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyNettoNOPRICE: () => {
        return get().auth.koszyk.produkty.reduce((total, item) => total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyBrutto: () => {
        return get().auth.koszyk.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyNetto: () => {
        return get().auth.koszyk.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenanetto*item.ilosc)/100) : total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyBrutto: (id) => {
        return get().order.find(e => e.id === id)?.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyNetto: (id) => {
        return get().order.find(e => e.id === id)?.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenanetto*item.ilosc)/100) : total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyBruttoNOPRICE: (id) => {
        return get().order.find(e => e.id === id)?.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyNettoNOPRICE: (id) => {
        return get().order.find(e => e.id === id)?.produkty.reduce((total, item) => total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

})))