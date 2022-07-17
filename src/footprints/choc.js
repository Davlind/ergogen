// Kailh Choc PG1350
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
// 
// note: hotswap and reverse can be used simultaneously

module.exports = {
  nets: {
    from: undefined,
    to: undefined
  },
  params: {
    class: 'S',
    hotswap: false,
    reverse: false,
    keycaps: false,
    tracks: false
  },
  body: p => {
    const standard = `
      (module PG1350 (layer F.Cu) (tedit 5DD50112)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))      
      
      ${''/* middle shaft */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
        
      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      `
    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `

    const via = `
      (pad 1 thru_hole circle (at 7 -7.85) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.net.to.str})
    `
    function tracks() {
      let t = ''
      if (p.param.tracks) {
        if (p.param.reverse) {
        let t = `
        ${'' /* B.Cu Column to via */}
        (pad "" smd custom (at 8.275 -3.75 ${p.rot}) (size 0.25 0.25) (layers B.Cu) ${p.net.to.str}
          (zone_connect 0)
          (options (clearance outline) (anchor circle))
          (primitives
            (gr_line (start 0 0) (end 0 -4.1) (width 0.25))
            (gr_line (start 0 -4.1) (end -1.17 -4.1) (width 0.25))
          ))

        ${'' /* F.Cu Column to via */}
        (pad "" smd custom (at -8.275 -3.75 ${p.rot}) (size 0.25 0.25) (layers F.Cu) ${p.net.to.str}
          (zone_connect 0)
          (options (clearance outline) (anchor circle))
          (primitives
            (gr_line (start 0 0) (end 4.1 -4.1) (width 0.25))
            (gr_line (start 4.1 -4.1) (end 15.2 -4.1) (width 0.25))
          ))

        ${'' /* F.Cu row to diode */}
        (pad "" smd custom (at 3.275 -5.95 ${p.rot}) (size 0.25 0.25) (layers F.Cu) ${p.net.from.str}
          (zone_connect 0)
          (options (clearance outline) (anchor circle))
          (primitives
            (gr_line (start 0 0) (end -0.5 0.5) (width 0.25))
            (gr_line (start -0.5 0.5) (end -0.5 10) (width 0.25))
            (gr_line (start -0.5 10) (end 0.5 11) (width 0.25))
          ))
          `
          }

          t += `
          ${'' /* B.Cu row to diode */}
          (pad "" smd custom (at -3.275 -5.95 ${p.rot}) (size 0.25 0.25) (layers B.Cu) ${p.net.from.str}
            (zone_connect 0)
            (options (clearance outline) (anchor circle))
            (primitives
              (gr_line (start 0.5 0) (end 6.05 5.55) (width 0.25))
              (gr_line (start 6.05 5.55) (end 6.05 10) (width 0.25))
              (gr_line (start 6.05 10) (end 7.05 11) (width 0.25))
            ))
        `        
      }

      return t
    }

    function pins(def_neg, def_pos, def_side) {
      if(p.param.hotswap) {
        return `
          ${'' /* holes */}
          (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
          (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))
          

          ${'' /* net pads */}
          (pad 1 smd rect (at ${def_neg}3.275 -5.95 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.net.from.str})
          (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.net.to.str})


        `
      } else {
          return `
            ${''/* pins */}
            (pad 1 thru_hole circle (at ${def_pos}5 -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.net.from.str})
            (pad 2 thru_hole circle (at ${def_pos}0 -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.net.to.str})
          `
      }
    }
    if(p.param.reverse) {
        return `
          ${standard}
          ${p.param.keycaps ? keycap : ''}
          ${p.param.tracks ? via : ''}
          ${tracks()}
          ${pins('-', '', 'B')}
          ${pins('', '-', 'F')})
        `
    } else {
      return `
        ${standard}
        ${p.param.keycaps ? keycap : ''}
        ${tracks()}
        ${pins('-', '', 'B')})
        `
    }
  }
}