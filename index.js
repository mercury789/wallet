function set(name, value) {

   localStorage.setItem(name, value)

}
function rem(name) {

   localStorage.removeItem(name)

}
function get(name) {

   return localStorage.getItem(name)
}
function clear() {
   localStorage.clear()
}
function save() {
   const copy = document.querySelector('[data-body]').innerHTML

   set('body', copy)
}


if (get('body')) {
   document.querySelector('[data-body]').innerHTML = get('body')

  
}

function procent() {

   let sum = 0
   let sumUah = 0
   let sumUahNow = 0
   let sumNow = 0

   const statUsdtAll = document.querySelectorAll('[data-stat-usdt]')
   statUsdtAll.forEach((statUsdt) => {
      if (statUsdt) {
         sum = sum + Number(statUsdt.innerText)
      }
   })
   const statUahAll = document.querySelectorAll('[data-stat-uah]')
   statUahAll.forEach((statUah) => {
      if (statUah) {
         sumUah = sumUah + Number(statUah.innerText)
      }
   })
   const statUahNowAll = document.querySelectorAll('[data-stat-uah-now]')
   statUahNowAll.forEach((statUahNow) => {
      if (statUahNow) {
         sumUahNow = sumUahNow + Number(statUahNow.innerText)
      }
   })

   document.querySelector('[data-stat-ballance-usdt]').innerText = sum.toFixed(1)
   document.querySelector('[data-stat-ballance-uah]').innerText = sumUah.toFixed(0)

   const statUsdtAllNow = document.querySelectorAll('[data-stat-usdt-now]')
   statUsdtAllNow.forEach((statUsdtNow) => {
      if (statUsdtNow) {
         sumNow = sumNow + Number(statUsdtNow.innerText)
      }
   })

   document.querySelector('[data-stat-ballance-usdt-now]').innerText = sumNow.toFixed(1)
   document.querySelector('[data-stat-ballance-uah-now]').innerText = sumUahNow.toFixed(0)

   statUsdtAll.forEach((statUsdt) => {
      if (statUsdt) {

         const wallet = statUsdt.closest("[data-stat-wallet]")
         wallet.querySelector('[data-stat-procent]').innerText = `${(Number(statUsdt.innerText) / sum * 100).toFixed(1)}%`
      }
   })
   
   
   
   
   const parent = document.querySelector('[data-stat-body]')
const items = Array.from(parent.querySelectorAll('[data-stat-wallet]'))

items
  .sort((a, b) => {
    const numA = +a.querySelector('[data-stat-uah]').textContent
    const numB = +b.querySelector('[data-stat-uah]').textContent
    return numB - numA // выше больше
  })
  .forEach(el => parent.appendChild(el))
   
   


}



document.addEventListener("click", (event) => {

   const targ = event.target

       if (targ.closest("[data-procent]")) {

           let procent = Number(prompt('процент депа'))

           const wallet = targ.closest('[data-wallet]')

          const walletNum = Number(wallet.querySelector('[data-num]').innerText)

           const result = procent / 100 * walletNum

         console.log(result)

        if (procent) {
            const check = confirm (result.toFixed(2))

            if (check) {
              const orders = document.querySelector('[data-orders]')

              const wallet = targ.closest('[data-wallet]')
              const name = wallet.querySelector('[data-name]')
              const num = wallet.querySelector('[data-num]')

              const calc = Number(num.innerText) - result
              num.innerText = calc.toFixed(2)


                orders.insertAdjacentHTML('beforeend', `
           <div data-order>
            <div data-order-name>${name.innerText}</div>
            <div data-order-num>${result.toFixed(2)}</div>
            <div data-order-procent>${procent}%</div>

              <button data-order-pnl>+</button>

         </div>
           `)
            }
        }

        save()

       }


       if (targ.closest("[data-add]")) {

           const name = prompt('название')
           const num = prompt('балланс')

           const groupBody = targ.closest('[data-group]').querySelector('[data-group-body]')

           if (name && num) {

             groupBody.insertAdjacentHTML('beforeend', `
           <div data-wallet>
            <div data-name>${name}</div>
            <div data-num>${Number(num).toFixed(2)}</div>

            <button data-procent>+</button>

            <div data-pnl-procent>0.00%</div>

            <div data-pnl-start>${Number(num).toFixed(2)}</div>
         </div>
           `)
           }


       save()

       }

       if (targ.closest("[data-name]")) {
         const name = targ.innerText

         const text = prompt('название', name)

         if (text) {
           targ.innerText = text
         } 

         save()

       }

       if (targ.closest("[data-num]")) {
         const num = targ.innerText

         const text = Number(prompt('балланс', num))

         if (text || text === 0) {
           targ.innerText = text.toFixed(2)
         } 

         save()

       }

       if (targ.closest("[data-pnl-start]")) {
         const num = targ.innerText

         const text = Number(prompt('старт', num))

         if (text) {
           targ.innerText = text.toFixed(2)
         } 

         save()

       }

       if (targ.closest("[data-order-pnl]")) {

         const data = Number(prompt('количество'))

         const order = targ.closest('[data-order]')


         const name = order.querySelector('[data-order-name]')
              const num = order.querySelector('[data-order-num]')




         const walletAll = document.querySelectorAll('[data-wallet]')

           walletAll.forEach((e) => {

             const eName = e.querySelector('[data-name]')
            const eNum = e.querySelector('[data-num]')
            const ePnlStart = e.querySelector('[data-pnl-start]')
             const ePnlProcent = e.querySelector('[data-pnl-procent]')

            if (name.innerText === eName.innerText) {

              if (data >= 0) {
                console.log('profit')
                // profit
                const sum = (Number(num.innerText) + data + Number(eNum.innerText)).toFixed(2)

                  eNum.innerText = sum

                  const check = ((sum - Number(ePnlStart.innerText)) / Number(ePnlStart.innerText) * 100)

                  console.log(check)

                  if (check >= 0) {
                    console.log('green')
                    ePnlProcent.style.color = 'green'
                  } else {
                    console.log('red')
                    ePnlProcent.style.color = 'red'
                  }

                  ePnlProcent.innerText = `${check.toFixed(2)}%`

             } else {
               console.log('lose')
                  // lose
                  const sum = Number(num.innerText) + Number(eNum.innerText) + data

                  eNum.innerText = sum

                  const check = ((sum - Number(ePnlStart.innerText)) / Number(ePnlStart.innerText) * 100)

                  ePnlProcent.innerText = `${check.toFixed(2)}%`


                  if (check >= 0) {
                    ePnlProcent.style.color = 'green'
                  } else {
                    ePnlProcent.style.color = 'red'
                  }
               }
            }

           })

              order.remove()

              save()
       }

       if (targ.closest("[data-group-add]")) {
         const x = prompt('название')

         const groups = document.querySelector('[data-groups]')

       if (x) {



         groups.insertAdjacentHTML('beforeend', `
         <div data-group>
      	    <div data-tag>${x}</div>
      	    <div data-group-body>

            </div>

           <button data-add>+</button>
           <button data-cross>x</button>
           </div>
         `)

       }

         save()
       }

       if (targ.closest("[data-tag]")) {
           const name = targ.innerText

         const text = prompt('название', name)

         if (text) {
           targ.innerText = text
         } 

         save()
       }

   if (targ.closest("[data-reset]")) {
      clear()
   }

       if (targ.closest("[data-cross]")) {

         targ.closest('[data-group]').remove()
       }

if (targ.closest("[data-stat-info-cross]")) {

         targ.closest('[data-stat-info-wallet]').remove()
       }


   if (targ.closest("[data-stat-title]")) {
      const name = prompt('название')
      const num = prompt('балик')
 
      if (name) {
         if (num) {
            document.querySelector('[data-stat-body]').insertAdjacentHTML('beforeend', `
             <div data-stat-wallet>
               <div data-stat-name>${name}</div>
               <div data-stat-progress-usdt>
                  <div data-stat-usdt-now>${(num / 41).toFixed(1)}</div>
                  <span>/</span>
                  <div data-stat-usdt>${(num / 41).toFixed(1)}</div>
               </div>
               <div data-stat-progress-uah>
                  <div data-stat-uah-now>${num}</div>
                  <span>/</span>
                  <div data-stat-uah>${num}</div>
               </div>
               <div data-stat-add>-</div>
               <div data-stat-procent>0<span>%</span></div>
               <div data-stat-cross>x</div>
            </div>
         `)
            procent()
            save()
         }

      }

   }

   if (targ.closest("[data-stat-cross]")) {
      targ.closest("[data-stat-wallet]").remove()
      save()

   }

   if (targ.closest("[data-stat-ballance-usdt]")) {
      procent()
      save()

   }

   if (targ.closest("[data-stat-uah]")) {
      const num = prompt('балик', targ.innerText)

      if (num) {
         const wallet = targ.closest("[data-stat-wallet]")
         wallet.querySelector('[data-stat-usdt]').innerText = (Number(num) / 41).toFixed(1)
         targ.closest("[data-stat-uah]").innerText = Number(num).toFixed(0)
         procent()
         save()
      }

   }

   if (targ.closest("[data-stat-ballance-uah]")) {
      const num = prompt('балик', targ.innerText)

      if (num) {
         const ballance = targ.closest("[data-stat-ballance]")
         ballance.querySelector('[data-stat-ballance-usdt]').innerText = (Number(num) / 41).toFixed(1)
         targ.closest("[data-stat-ballance-uah]").innerText = Number(num).toFixed(0)
         procent()
         save()
      }

   }

   if (targ.closest("[data-stat-name]")) {
      const name = prompt('название', targ.innerText)

      if (name) {
         targ.innerText = name
         save()
      }

   }

   if (targ.closest("[data-stat-add]")) {
      const num = Number(prompt('расход'))

      if (num) {
         const wallet = targ.closest("[data-stat-wallet]")

         const usdtNow = wallet.querySelector('[data-stat-usdt-now]')
         const uahNow = wallet.querySelector('[data-stat-uah-now]')
         const name = wallet.querySelector('[data-stat-name]')

         usdtNow.innerText = (num / 41 + Number(usdtNow.innerText)).toFixed(1)
         uahNow.innerText = (num + Number(uahNow.innerText)).toFixed(0)

         document.querySelector('[data-stat-info]').insertAdjacentHTML('afterbegin', `
            <div data-stat-info-wallet>
               <div data-stat-info-name>${name.innerText}</div>
               <div data-stat-info-usdt>${(Number(num) / 41).toFixed(1)}</div>
               <div data-stat-info-uah>${num}</div>
               <div data-stat-info-cross>x</div
            </div>
         `)

         procent()
         save()
      }
   }

   if (targ.closest("[data-tab-btn]")) {

      const tabBtnAll = document.querySelectorAll('[data-tab-btn]')
      tabBtnAll.forEach((tabBtn) => {
         if (tabBtn === targ.closest("[data-tab-btn]")) {
            tabBtn.classList.add('_active')

            if (tabBtn.getAttribute('data-tab-btn') === 'crypto') {
               document.querySelector('[data-crypto]').classList.add('_active')
               document.querySelector('[data-stat]').classList.remove('_active')
            }

            if (tabBtn.getAttribute('data-tab-btn') === 'stat') {
               document.querySelector('[data-stat]').classList.add('_active')
               document.querySelector('[data-crypto]').classList.remove('_active')

            }


         } else {
            tabBtn.classList.remove('_active')


         }

      })

      procent()
      save()

   }


}

)


