import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import decodePolyline from 'decode-google-map-polyline';
import Marker from './Extras/Marker'
import Polyline from './Extras/Polyline'

const googleMapsKey = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

const polyline = 'k|biJo~emBkf@flAeXfnBmt@l|@oO|EsYxUicAfVg\\jMyu@zf@ez@vgAyy@dp@yz@|rBwCzFuq@b`@gf@dWwZxYyB`@q{Ar~A{AzA_r@ng@ae@vF_C`BsXjC_q@n[q[~YqE`C{dCxyBm_AjKclAqh@yBaAqo@wMgnBtb@ygB~J{pAu_@ou@qC}x@xMwc@cO}bBoiBwe@wUwtBw_@mn@_N@a@A`@shAsZwm@fc@qZhgAqHnmAe@`hA`KveEqEthBiVxzAeNl]{n@xhAy|@|`@_b@tYyz@h]ooAj}@Is@kcElvCgxBpl@y|An_@sIxF_mDpkEmt@h{AqsDruIqm@vbAgwAtBceA~LwTkGqx@gv@cm@mhAc|@g|AcfAuv@u`Cm~C}QqKwVwMk}A{rAmLgEiwCmTmt@jB}`@gR_{@aK?Miu@qJe{@|TeiAxJgwCw{@CPcu@sSe{G}HghBi@uyD|_A}r@eAigD`u@gx@l~@_Vlr@qAdEg`@`gBaTxyA{T~z@}kB`vDuy@~xAyT`OoeAhYkwB|iCie@`xAm~@r{Doj@|`AuwA`eAaa@l`AgBnCif@rtBkmE`cMeo@zgAq_@j`@ug@j\\_j@zXadA~LwnDih@@Ou{@yNg`@qRsm@em@crBiiBiz@_Xm_BpG}mB{e@mv@lFimAt_AkHxDy{KxcC@`@yKhC{p@vk@yb@`yAiVbtBue@fgByOrmBmDj~BnPdzFsHneEwKzwE_Bx|BiPxg@oy@pgAcPp`@sk@dn@aBlB_@~Ayr@lkA}t@mzAwYwDed@jCmg@jm@{mB|dEeNd{@ef@zz@eh@bkByk@rtAwCpuB_`@~sCilAlxFe]jQ_`@bQsc@jy@yaAz`AufAxn@ew@pUcr@vhA}i@nk@{h@jkCyHzxFkY`jAcHhkCqN~rAApu@kf@jwDeUnn@gcAvaBkc@x`@ak@djDyb@nMk_@iN}d@wNmn@c]u_A_CkkDnoBme@jQqv@no@k{Ajd@m~AvRg_Ahp@ek@zS{sB@wcA|k@w|@@ap@}e@iqAciB_}@{`BcbCmjCm}@}Fqu@pz@cOnZeq@v{Akr@~g@ot@rUch@kJkeAtvAuoAb}@mj@hd@i{@duAq_@f]uUzo@i~@zv@e[bjA}Mtq@oDlu@yc@rnD_q@lb@Fv@u`@pZ_\\np@_{@hqA_m@`_Co_Az|A_r@~iBqp@~Hw~@r`AuWz`@eY~v@adA`qDqj@d}@_S~bAgnApbCg~@xXmUoE}{As[_cAvd@o]qJot@rb@un@qQwiBkrCib@vHiq@PsiBnbAca@|y@av@zo@qbA`Tg^l@{`@cSu|@b`@}Zvc@g[bOu]c@mqAvKyBWer@mCwYlRwkA|Ogv@dmAqh@vWqw@feAs]jw@c^h[cy@fSmr@hrBqjCpMed@xaAoiAdsAeXzk@uFz\\oKfy@uXdyGsUzfCk]~uA{Un_@{j@hy@_s@d^cUcHkd@kc@ehBm}@s_BwTkbBgSqmBvfAej@rL}|@cGwf@xi@_MHwmCmd@{c@dM}x@~qAqFbSsg@fmD{e@fsBKSwj@dvBacA|HsJj_@oZ`mDy_@jg@}\\hmAog@hiAea@nm@qg@Oal@sQcv@pfAq]xX_i@vmAaa@vqAcn@rgDwk@vG_g@kr@mc@_PgsA{L_b@`Va}Aa|@ys@eLcaAxYsa@zi@en@dxAml@d`Cwz@dgAke@bg@sg@d_Cao@|oAcm@nd@gWdb@wk@jYax@xoAyXz\\}l@rpAuXfX_m@hcBk[bm@uNju@i{@|wAeFny@gs@|qEq\\xl@cq@|nBg_AljAik@lOoi@pf@}~@iD{z@xh@o_@sHms@xA_w@wp@qP`Tyc@r_BkoAbsAaw@rQsh@_s@kU}k@eZy_@oj@{Nwf@qp@cv@tEgbAbl@cu@mj@wt@uxA_YaBuy@ld@it@bo@kh@hiAk[r_Bsm@niBcg@ruB{dAnhCyw@|n@c[xo@mZ`_Bwu@fuCsuAd}DesAzlAkW~h@w_B~m@sb@vl@cVj_A{d@|{@yZdVixAh`@ge@c}A{Ss~Ay`Aoi@u}@zSg`AnBa]kcBw@_sC{_@ieBnByrCwCqi@u_@e`DeDol@sb@yiFnO_|ArWmmAid@iz@{Dzp@m@pF_]ltBuCt_Ayl@rwCu]raD{l@xjAwkAj~Am]dl@gcAxfAs[`h@_g@|c@w}@rVy]wFwgAz@wpBnQi}@{d@eP`H_|@b`Aej@`\\}[~EinAft@mm@zKa{@hnAog@jvCmYje@cg@bZgm@bGg}@hiAqtAbn@wb@zl@eoAndAaq@rVel@djCquAncAkeApwAev@i`@cg@liDw[duAkf@vvAaBlBkG|EwbBd_@mhAjGwn@cJ}|An{@qi@`|AsS~iAyOpCyv@cOyhAvj@jEnzA|Rju@eAf_@}HfaGl^|}AgGlcCsc@neB_XvhCc]hs@{cAcOeyApp@xGjwAtc@pg@}n@|pD}`@r{@{x@xkBqz@~y@gB`jBiVvm@cc@hRkt@`{@mb@lcAuJjj@{\\fn@wX~jAoi@`uAqj@t{@elA~_EujBblDkbChrBoPla@cdBnwDmt@vq@a|@dd@esB`bEk]lhAgL|`@u_@zoC_f@jyBuHneAuZp}AgTnd@cg@biBel@zeA}Vb]eUvCcpAaKcx@sn@e\\|z@wr@pqA{t@lxCk]`kCkm@djCuz@voA}n@vpAmo@bOcdAsGkWlOsrAjmBqkAr_Ca^|x@_~AprAqe@j}@ql@x_Ak[jrCoEpJk[jo@ep@tnB_XhdBTpwCvUb~BrIhtCwKrfBZzpBdDnShWfdBzdArsBlc@lxA`dAfvAfFxe@dS`nF~m@xaDPtv@{j@~vFc`AtvGqn@bqCqPrvArVhcJrSjw@j[zd@r_@xjCsEd|C~\\v}Axi@bhDjWvl@b~@toBlD~i@~BrrBzOrk@vo@nkApGviAcNxqBoj@jyBu|ApqDaZtaEkEjmAjF~rCud@jkF{G~nAwUtpB}c@`vB_h@xuAwHfmAaj@zaCqKfxAmOn|Add@taBpN`cAxPfl@`c@nuC|OrzArIjyAbp@dcC`^bhBzAlaBxI~jAyEd|AdAfw@eI`cDkTfoAuGv`@qm@reDwsA|mBwdBhiAg]nr@w`BhkB_k@xqAk_@|vBqXb~Co_@|w@mVtcA'

const polyline2 = 'q_r`KkhjxAeC`DeNjAkTrBiXrCyCwMgKqDiGeJa\\kNaNs@}GtEe_@`Qe~@~f@qYp@wJpa@m[ne@ah@h}@wRvXmy@f}@uW`g@sPpj@kIdc@uSl_BuMbo@gIfYkQ~c@_X`c@oE~Es\\jYmK|KiMlRcqAlgC}`@zl@g|@b~@gDbFmOz[cKdb@yAxKyLh_AmMdq@yPsKuQzVcBvIsWbf@oDt@_InDeO~FsQ|E}R`IpOtj@~FdIxTdShGbOsE|n@Zv_@tGlaAfFzwA~B~cAsCp~BrBlkDdBvxCzBre@`CzW_FjHkXjl@iUdXoOri@kQjX{e@lfAePhW}Ap`@sE~LrLxa@xE`HxLbTpXvh@vF`Z~Ctr@|Plh@xFvh@xF`V~Zhu@|X~b@dDaBzF|a@jKpb@tCvTpFfc@xI~v@|Fxj@tAzT~DjbBJ~c@{EtzCoE`i@wJxp@iHrk@s@jOqFbt@eGjj@}Kxt@iInb@\\`JgCxv@{Lr{@}FzY{I|ZqKnb@oKhk@aMvZuB`zA`Frh@rNh`@bVr`@rFfVnMp{@vNzq@dJ`\\hKlZrKxV|d@hx@rQvf@pVbcA~Gpk@fAdd@i@pr@tFpAl@ViElr@|@hv@y@vH_AhWnEjyCf@xOpAdj@mL~LiMbL_Dhy@wJd}AmLfiDq@~iCcDb_CoDt`ACdg@p@fSxIzuAx@bWpAn`ArOv^`FhSpCxGsBtZuDtf@uCjZP|M}B`GmD~k@uCpCnAlNdCr[zE~mBs@nTgMltA{VvrA}AjMiRl~BqEjz@kRbaBwFlVkQ`a@eYn_A}Q|e@uLdi@cBrw@cDjUkPxw@qEjl@}Bzn@eJv]iDLwHve@mA|PjJfh@fUvw@bKx^`Jxx@`Kvi@hAfLtJht@`In^rG~YpExZvGfl@xAtYzSroBxAfFbO`u@pI`g@tH`TlHx[tNln@nBnWdAnr@_@`_Ag@f{Ak@nWaC~eAoBhb@uCbcAuBna@kIzu@cLp}@qHv]_v@xrBwS|b@w[bj@iR~a@mEnRqKzd@sRtYwl@l`@gXt[_@I_s@zlAoOlR__@pa@}Rt\\aLbk@{P`_AiH`g@_G`u@sCpn@_Gnw@eLvu@mNxZmPlUr@rVkS|v@{BpA'

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapsLoaded: false,
      map: null,
      maps: null
    }
  }

  onMapLoaded(map, maps) {
    this.fitBounds(map, maps)

    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  fitBounds(map, maps) {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  afterMapLoadChanges() {
    return (
      <div style={{ display: 'none' }}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={this.props.markers} />
      </div>
    )
  }

  render() {
    return (
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: googleMapsKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}>
          <Marker text={'Toronto'} lat={43.681583} lng={-79.61146} />
          <Marker text={'Rioe de janeoro'} lat={59.33258} lng={18.0649} />
          {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
        </GoogleMap>
      </div>
    )
  }
}

Map.defaultProps = {
  markers: decodePolyline(polyline),
  //markers: [

  //{ lat: 43.681583, lng: -79.61146 }, //Toronto
  //{ lat: 53.42728, lng: -6.24357 }, // Dublin
  //{ lat: 59.33258, lng: 18.0649 }, // Stockholm
  // { lat: 53.42728, lng: -6.24357 }, // Dublin
  //{ lat: 43.681583, lng: -79.61146 } //Toronto
  //],
  center: [47.367347, 8.5500025],
  zoom: 4
}

export default Map;

// Stockholm
// "lat": 59.33258,
// "lng": 18.0649,

// Åre
// "lat": 63.40109,
// "lng": 13.08222,

// Falun
// "lat": 60.60357,
// "lng": 15.62597,