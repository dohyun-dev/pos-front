import {
  Children as mr, cloneElement as xr,
  createContext as _n, isValidElement as Dr, Suspense as Oe,
  useCallback as K,
  useContext as bt, useEffect as ie, useId as $o,
  useLayoutEffect as Ti, useMemo as me,
  useRef as de,
  useState as q
} from "react";
import {useInfiniteQuery as mk, useMutation as lt, useSuspenseQuery as st} from "@tanstack/react-query";
import {createFileRoute as Et, useLocation as Es, useNavigate as an} from "@tanstack/react-router";

function b4u({
               categories: e,
               selectedCategoryId: t,
               onSelectCategoryId: n,
               addon: r,
               className: i,
               withAll: o = !0,
               isScrollTrigger: s = !1
             }) {
  const u = ro({
      direction: "horizontal"
    }),
    l = de(null),
    c = de([]),
    d = K(p => {
      const f = c.current[p];
      f != null && u.scrollTo({
        direction: "horizontal",
        durationTime: 300,
        distanceOffset: f == null ? void 0 : f.offsetLeft
      })
    }, [u]),
    h = K(() => {
      const p = e.findIndex(f => f.id === t);
      if (0 <= p) {
        d(p);
        return
      }
      u.scrollTo({
        direction: "horizontal",
        durationTime: 300,
        distanceOffset: 0
      })
    }, [e, d, u, t]);
  return Ti(() => {
    s && h()
  }, [s, h]), y(H, {
    css: [$e, {
      maxWidth: "100%",
      position: "relative"
    }],
    className: i,
    children: [y(Qd, {
      direction: "horizontal",
      ref: u.ref,
      css: [$e, {
        maxWidth: "100%",
        display: "flex",
        columnGap: 7,
        position: "absolute",
        paddingRight: 20
      }],
      children: [o ? a("div", {
        ref: l,
        children: a(he, {
          size: "medium",
          style: t == null ? "fill" : "weak",
          type: "dark",
          onClick: () => n == null ? void 0 : n(void 0),
          children: "전체"
        })
      }) : null, e.map((p, f) => a("div", {
        ref: g => {
          g != null && (c.current[f] = g)
        },
        children: a(he, {
          size: "medium",
          style: t === p.id ? "fill" : "weak",
          type: "dark",
          onClick: () => n == null ? void 0 : n(p.id),
          children: p.title
        })
      }, p.id)), a(ce, {
        direction: "horizontal",
        size: 44
      })]
    }), a(ce, {
      size: 38
    }), a(C4u, {
      direction: "right"
    }), r]
  })
}
const C4u = nt("div")(({
                         direction: e
                       }) => ({
    position: "absolute",
    zIndex: 1,
    pointerEvents: "none",
    background: x4u(e),
    left: e === "left" ? 0 : void 0,
    right: e === "right" ? 0 : void 0,
    width: 120,
    minHeight: "100%",
    height: "100%"
  })),
  x4u = e => `linear-gradient(to ${e==="left"?"right":"left"}, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))`,
  GBt = _n({
    selectedValue: "",
    onChange: () => {}
  });
GBt.displayName = "ButtonsTabContext";

function FO({
              value: e,
              onChange: t = () => {},
              children: n,
              className: r
            }) {
  return a(GBt.Provider, {
    value: {
      selectedValue: e,
      onChange: t
    },
    children: a(H, {
      css: {
        flexWrap: "wrap"
      },
      className: r,
      children: n
    })
  })
}
FO.Item = function({
                     value: t,
                     size: n = "medium",
                     disabled: r,
                     onClick: i,
                     className: o,
                     children: s
                   }) {
  const {
    selectedValue: u,
    onChange: l
  } = bt(GBt), c = t ?? String(s), d = u === c;
  return a(he, {
    size: n,
    style: d ? "fill" : "weak",
    "aria-pressed": d,
    type: "dark",
    disabled: r,
    onClick: () => {
      l(c), i == null || i()
    },
    css: {
      margin: 3
    },
    className: o,
    children: s
  })
};
const w4u = "ALL";

function _4u({
               selectedCategoryId: e,
               categories: t,
               onSelectCategoryId: n,
               addon: r,
               withAll: i = !0,
               className: o
             }) {
  return y(H, {
    direction: "row",
    css: {
      padding: "16px 11px 16px 16px",
      border: `1px solid ${_.grey100}`,
      borderRadius: 16,
      boxShadow: `0px 5px 5px 0px ${_.greyOpacity100}`
    },
    className: o,
    children: [y(FO, {
      value: e != null ? String(e) : "ALL",
      onChange: s => {
        const u = t.find(l => String(l.id) === s);
        n == null || n(u == null ? void 0 : u.id)
      },
      css: {
        flex: 1,
        columnGap: 1
      },
      children: [i ? a(FO.Item, {
        value: w4u,
        children: "전체"
      }) : null, t.map(s => a(FO.Item, {
        value: String(s.id),
        children: s.title
      }, s.id))]
    }), r]
  })
}
const Opn = V({
  width: 38,
  height: 38
});

function txr({
               className: e,
               ...t
             }) {
  const [n, r] = q(!1), [i, o] = q(0), s = Kw(u => {
    o(u.contentRect.width)
  });
  return y("div", {
    ref: s,
    css: [$e],
    className: e,
    children: [n ? y(Q, {
      children: [a(A4u, {
        onClick: () => r(!1)
      }), a(_4u, {
        ...t,
        addon: a(W, {
          click: {
            schemaId: Wt.상품_관리_카테고리_토글_클릭,
            params: {
              toggleYn: !1
            }
          },
          children: a(he, {
            type: "dark",
            style: "weak",
            css: Opn,
            onClick: () => r(!1),
            children: a(rt, {
              name: "icon-arrow-up-small-mono",
              color: M.grey600
            })
          })
        }),
        onSelectCategoryId: async u => {
          var l;
          (l = t.onSelectCategoryId) == null || l.call(t, u), await Sa(60), r(!1)
        },
        css: {
          maxHeight: "70vh",
          overflow: "scroll",
          width: i + 32,
          transform: "translateX(-20px) translateY(-20px)",
          position: "absolute",
          zIndex: 3,
          background: _.white,
          "::-webkit-scrollbar": {
            display: "none"
          }
        }
      })]
    }) : null, a(b4u, {
      ...t,
      addon: a(W, {
        click: {
          schemaId: Wt.상품_관리_카테고리_토글_클릭,
          params: {
            toggleYn: !0
          }
        },
        children: a(he, {
          type: "dark",
          style: "weak",
          css: [{
            position: "absolute",
            zIndex: 2,
            right: 0
          }, Opn],
          onClick: () => r(!0),
          children: a(rt, {
            name: "icon-arrow-down-small-mono",
            color: M.grey600
          })
        })
      }),
      isScrollTrigger: n,
      css: [$e, {
        position: "relative"
      }]
    })]
  })
}

function A4u(e) {
  return a("div", {
    css: {
      position: "fixed",
      width: "100vw",
      height: "100vh",
      left: 0,
      top: 0,
      zIndex: 1
    },
    ...e
  })
}

function E4u() {
  const e = ht(),
    t = f7t();
  return K(async ({
                    ids: n,
                    onNavigateToDeleteItem: r
                  }) => {
    try {
      await Orr(n), await Db(), e.open({
        message: `${n.length}개의 상품을 삭제했어요!`,
        icon: "icn-success-color"
      })
    } catch (i) {
      throw await t(i, {
        onNavigateToDeleteItem: r
      }) ? new Ate("횟수권에 포함된 상품입니다.") : i
    }
  }, [t, e])
}

function D4u({
               open: e,
               loading: t,
               onOpenChange: n,
               onDelete: r,
               onSoldOut: i,
               onSale: o
             }) {
  const {
    data: s
  } = rx(), u = (s == null ? void 0 : s.catalogManagement) === !0;
  return a(Q, {
    children: e ? y(I.Horizontal, {
      gutter: 6,
      children: [a(W, {
        click: {
          schemaId: Wt.상품_관리_전체_삭제_품절_버튼_클릭,
          params: {
            text: "삭제"
          }
        },
        children: a(cc, {
          disabled: u,
          variant: "border",
          theme: "red",
          size: "small",
          loading: t,
          onClick: r,
          children: "삭제"
        })
      }), a(W, {
        click: {
          schemaId: Wt.상품_관리_전체_삭제_품절_버튼_클릭,
          params: {
            text: "품절"
          }
        },
        children: a(cc, {
          variant: "border",
          theme: "grey",
          size: "small",
          loading: t,
          onClick: i,
          children: "품절"
        })
      }), a(W, {
        click: {
          schemaId: Wt.상품_관리_전체_삭제_품절_버튼_클릭,
          params: {
            text: "품절해제"
          }
        },
        children: a(cc, {
          variant: "border",
          theme: "grey",
          size: "small",
          loading: t,
          onClick: o,
          children: "품절해제"
        })
      }), a(W, {
        click: {
          schemaId: Wt.상품_관리_전체_삭제_품절_버튼_클릭,
          params: {
            text: "버튼 숨기기"
          }
        },
        children: a(cc, {
          variant: "border",
          theme: "grey",
          size: "small",
          loading: t,
          onClick: () => n(!1),
          children: "버튼 숨기기"
        })
      })]
    }) : a(W, {
      click: {
        schemaId: Wt.상품_관리_전체_삭제_품절_버튼_클릭,
        params: {
          text: "전체 삭제/품절"
        }
      },
      children: a(cc, {
        variant: "border",
        theme: "grey",
        size: "small",
        loading: t,
        onClick: () => n(!0),
        children: "전체 삭제/품절"
      })
    })
  })
}

function T4u({
               menuItem: e,
               checked: t,
               onCheckboxClick: n
             }) {
  return a(H.Center, {
    children: a(Bb, {
      checked: t,
      onChange: () => {
        n(e.catalogItem.id)
      }
    })
  })
}

function B4u({
               menuItem: e,
               className: t
             }) {
  const [n, r] = q(e.catalogItem.durationMinutes ?? 0), i = m7t(), o = nCe(async () => {
    await i({
      before: j0(e.catalogItem),
      after: j0(mn(e.catalogItem, s => {
        s.durationMinutes = n
      }))
    })
  }, 300);
  return jC(() => {
    r(e.catalogItem.durationMinutes ?? 0)
  }, [e.catalogItem.durationMinutes]), a(H.Center, {
    css: {
      width: 80,
      margin: "auto"
    },
    className: t,
    children: a(Me, {
      size: "xsmall",
      children: a(W, {
        click: {
          schemaId: Wt.상품_소요시간_클릭
        },
        params: {
          text: `${n}`,
          itemId: e.catalogItem.id,
          itemTitle: e.catalogItem.title,
          categoryId: e.catalogItem.category.id,
          categoryTitle: e.catalogItem.category.title
        },
        children: a(Me.TextField, {
          value: `${n}`,
          rightAddon: a(Me.Txt, {
            color: _.grey700,
            children: "분"
          }),
          onChange: s => {
            r(F7e(Number(es(s.target.value)), 0, 60 * 24)), o()
          }
        })
      })
    })
  })
}

function S4u({
               title: e,
               menuItem: t,
               onClick: n
             }) {
  const r = kbe(t.price),
    i = t.price.priceType;
  return a(ue, {
    contents: a(ue.Texts, {
      type: "2RowTypeA",
      top: a("span", {
        css: [$e, {
          div: fn
        }],
        children: e ?? t.title
      }),
      topProps: {
        color: _.grey700,
        fontWeight: "bold"
      },
      bottom: a("span", {
        css: [$e, fn],
        children: i === "VARIABLE" ? "직접입력" : r
      }),
      bottomProps: {
        color: _.grey700
      }
    }),
    withTouchEffect: !Un.isElectron,
    onClick: n,
    css: [Un.isElectron ? Ft : void 0, $e, {
      overflow: "hidden"
    }]
  })
}

function k4u({
               menuItem: e,
               className: t
             }) {
  const {
    data: n
  } = rx(), r = (n == null ? void 0 : n.catalogManagement) === !0, i = async (o = null) => {
    await CVe(j0(e.catalogItem), j0({
      ...e.catalogItem,
      imageUrl: o
    })), await Db()
  };
  return y(H, {
    direction: "column",
    justify: "center",
    css: {
      position: "relative"
    },
    className: t,
    children: [a(dG, {
      width: 72,
      height: 72,
      placeHolder: "plus",
      disabled: r,
      imageUrl: e.catalogItem.imageUrl,
      onUpload: i,
      onError: o => {
        const s = "path" in o && typeof o.path == "string" ? o.path : null;
        ye.debug("Compressed_Failed", {
          lastModified: o.lastModified,
          name: o.name,
          path: s,
          size: o.size,
          type: o.type
        })
      },
      onDelete: () => {
        ye.log(Wt.상품관리_x_버튼_클릭), i(null)
      },
      css: {
        aspectRatio: "1 / 1"
      }
    }), a("div", {
      css: {
        position: "absolute",
        left: 3,
        top: 4,
        borderRadius: 8,
        background: "white"
      },
      children: a(wre, {
        item: e.catalogItem,
        size: "small",
        css: {
          display: "block !important"
        }
      })
    })]
  })
}

function nxr(e) {
  return {
    itemId: e.catalogItem.id,
    itemTitle: e.title,
    categoryId: e.category.id,
    categoryTitle: e.category.title
  }
}

function F4u({
               menuItem: e,
               className: t
             }) {
  var u;
  const n = (u = e.price.stockQuantity) == null ? void 0 : u.remainQuantity,
    r = v7t(),
    {
      edit: i
    } = $4u(),
    o = async () => {
      const l = await r({
        initialQuantity: n,
        priceId: e.price.id,
        menuItem: e,
        referrer: "상품"
      });
      l.quantity !== 0 && await i({
        inventory: {
          isStockable: !0,
          ...l
        },
        menuItem: e
      })
    }, s = de(null);
  return a(H.Center, {
    className: t,
    children: n != null ? a("div", {
      css: {
        width: 72
      },
      children: a(W, {
        click: {
          schemaId: Wt.상품관리_재고수량_클릭,
          params: {
            ...nxr(e),
            text: n
          }
        },
        children: a(Me, {
          size: "xsmall",
          children: a(Me.TextField, {
            ref: s,
            value: n,
            placeholder: "0",
            inputMode: "none",
            onClick: () => {
              var l;
              (Un.isIos || Un.isAndroid) && ((l = s.current) == null || l.blur()), o()
            },
            onChange: () => {}
          })
        })
      })
    }) : null
  })
}

function $4u() {
  const e = ht(),
    {
      mutateAsync: t
    } = lt({
      mutationFn: async ({
                           inventory: n,
                           menuItem: r
                         }) => {
        var o;
        const i = {
          targetIdentifier: {
            targetType: "ITEM_PRICE",
            targetId: r.price.id
          },
          source: "MERCHANT",
          quantity: Math.abs(n.quantity),
          reasonId: (o = n.reason) == null ? void 0 : o.id,
          requestTime: Ue(new Date, "yyyy-MM-dd'T'HH:mm:ss")
        };
        return n.quantity > 0 ? (await UCr(i), "IN") : (await WCr(i), "OUT")
      },
      onSuccess: async n => {
        await Db();
        const r = n === "IN" ? "재고를 추가했어요" : "재고를 차감했어요";
        e.open({
          icon: "icn-success-color",
          message: r
        })
      }
    });
  return {
    edit: t
  }
}

function I4u({
               menuItem: e,
               className: t
             }) {
  var u;
  const n = e.state === "SOLD_OUT",
    r = ht(),
    i = ((u = e.price.stockQuantity) == null ? void 0 : u.remainQuantity) ?? -1 / 0,
    o = e.price.isStockable ? i <= 0 : !1,
    {
      mutateAsync: s
    } = x7({
      queryKey: qC.items(),
      mutationFn: async l => {
        await CVe(j0(e.catalogItem), j0(l))
      }
    }, (l, c) => l.map(d => d.id === c.id ? {
      ...d,
      state: c.state
    } : d));
  return a(H.Center, {
    className: t,
    onClick: () => {
      o && r.open({
        icon: "icon-warning-circle",
        size: "medium",
        message: "재고가 없어서 품절을 해제할 수 없어요"
      })
    },
    children: a(Ni, {
      capture: "onChange",
      schemaId: Wt.키오스크_관리_품절_표시_클릭,
      params: l => ({
        ...nxr(e),
        activeYn: l.target.checked
      }),
      children: a(ts, {
        checked: n,
        disabled: o,
        onChange: async l => {
          const d = l.target.checked ? "SOLD_OUT" : "ON_SALE";
          await s({
            ...e.catalogItem,
            state: d
          })
        }
      })
    })
  })
}

function P4u({
               menuItem: e,
               className: t
             }) {
  const {
    data: n
  } = rx(), r = (n == null ? void 0 : n.catalogManagement) === !0, i = e.price.priceType, o = i === "VARIABLE" || i === "UNIT", s = ht(), u = e.catalogItem.kioskEnabled === !0, l = async () => {
    const {
      catalogItem: d
    } = e, h = d.kioskTitle != null && O4u(d.kioskTitle) ? d.kioskTitle : d.title;
    await CVe(j0(d), j0({
      ...d,
      kioskEnabled: !u,
      kioskTitle: h
    })), await Db()
  }, c = () => {
    if (o) {
      const d = te(i).with("VARIABLE", () => "시가").with("UNIT", () => "무게").exhaustive();
      s.open({
        icon: "icon-warning-circle",
        message: `${d} 상품은 키오스크에 노출할 수 없어요`
      })
    }
  };
  return a(H.Center, {
    className: t,
    children: a(Ni, {
      capture: "onChange",
      schemaId: Wt.상품관리_노출여부_변경,
      params: d => ({
        catalogItemId: e.catalogItem.id,
        catalogItemTitle: e.title,
        toggleYn: d.target.checked
      }),
      children: a(H, {
        onClick: c,
        children: a(ts, {
          checked: u,
          disabled: r || o,
          onChange: l
        })
      })
    })
  })
}

function O4u(e) {
  return e != null && e.trim() !== ""
}

function R4u({
               isService: e,
               className: t,
               ...n
             }) {
  return y(H, {
    direction: "row",
    align: "center",
    className: t,
    children: [a(k4u, {
      ...n
    }), a(S4u, {
      ...n
    }), e ? a(B4u, {
      ...n
    }) : null, a(F4u, {
      ...n
    }), a(I4u, {
      ...n
    }), a(P4u, {
      ...n
    }), n.useCheckbox ? a(T4u, {
      ...n
    }) : null]
  })
}

function M4u({
               value: e,
               onChange: t
             }) {
  const [n, r] = q(!1), i = [30, 50, 100];
  return a("div", {
    css: $e,
    children: y(ti.Trigger, {
      open: n,
      onOpenChange: o => r(o),
      children: [a(Ye, {
        size: "small",
        rightAddon: n ? a(Ye.Icon, {
          name: "icon-arrow-up-small-mono"
        }) : a(Ye.Icon, {
          name: "icon-arrow-down-small-mono"
        }),
        css: {
          backgroundColor: _.white
        },
        children: `${e}개씩 보기`
      }), a(ti.Menu, {
        css: {
          minWidth: 130
        },
        children: a(W, {
          screen: {
            schemaId: Wt.상품_관리_페이지_필터_팝업
          },
          children: i.map(o => a(W, {
            click: {
              schemaId: Wt.상품_관리_페이지_필터_팝업
            },
            children: a(ti.Item, {
              onClick: () => {
                t(o)
              },
              children: `${o}개씩 보기`
            })
          }, o))
        })
      })]
    })
  })
}

function L4u({
               value: e,
               onChange: t
             }) {
  const [n, r] = q(!1);
  return a("div", {
    css: $e,
    children: y(ti.Trigger, {
      open: n,
      onOpenChange: i => r(i),
      children: [a(Ye, {
        size: "small",
        rightAddon: n ? a(Ye.Icon, {
          name: "icon-arrow-up-small-mono"
        }) : a(Ye.Icon, {
          name: "icon-arrow-down-small-mono"
        }),
        css: {
          backgroundColor: _.white
        },
        children: Rpn[e]
      }), a(ti.Menu, {
        children: pw(Rpn).map(([i, o]) => a(ti.Item, {
          onClick: () => {
            ye.log(Wt.상품관리_필터_팝업_필터_클릭, {
              text: o
            }), t(i)
          },
          children: o
        }, i))
      })]
    })
  })
}
const Rpn = {
  "createdAt.desc": "최신 순",
  "updatedAt.desc": "수정 순",
  "title.asc": "이름 순",
  "createdAt.asc": "오래된 순",
  "inventory.desc": "재고 많은 순",
  "inventory.asc": "재고 적은 순"
};

function N4u({
               value: e,
               onChange: t
             }) {
  const [n, r] = q(!1), i = o => {
    if (e.some(s => s === o)) {
      t(e.filter(s => s !== o));
      return
    }
    t(e.concat(o))
  };
  return y(ti.Trigger, {
    withPortal: !0,
    open: n,
    onOpenChange: o => r(o),
    children: [a(Ye, {
      size: "small",
      children: a(Ye.Icon, {
        name: "icon-filter-table-mono"
      })
    }), a(ti.Menu, {
      children: pw(V4u).map(([o, s]) => a(ti.CheckboxItem, {
        checked: e.some(u => u === o),
        onClick: () => {
          i(o)
        },
        children: s
      }, o))
    })]
  })
}
const V4u = {
  SOLD_OUT: "품절상품",
  ON_SALE: "판매상품"
};

function z4u({
               isService: e,
               selectedItemIds: t,
               onSelectedItemIdsChange: n,
               totalItemLength: r,
               items: i,
               filterTypes: o,
               onFilterTypesChange: s,
               isShowCheckbox: u
             }) {
  const {
    enabledFeatures: l,
    hasEnabledFeatures: c
  } = Qw();
  return a(zt, {
    size: "small",
    bordered: !1,
    head: y(zt.Row, {
      children: [a(zt.HCell, {
        width: c ? 100 : 480,
        children: `상품(총 ${fe(r)}개)`
      }), a(zt.HCell, {
        noWrap: !1
      }), e ? a(zt.HCell, {
        width: 100,
        children: "소요시간"
      }) : null, a(zt.HCell, {
        width: 100,
        children: "재고수량"
      }), y(zt.HCell, {
        noWrap: !1,
        width: 110,
        children: ["품절표시", a(N4u, {
          value: o,
          onChange: d => s(d)
        })]
      }), a(zt.HCell, {
        width: 110,
        rightAddon: a(kc, {
          message: c ? `${l.join("・")}
매장페이지에 보여져요` : "매장페이지에 보여져요",
          messageAlign: "center",
          placement: "top",
          size: "medium",
          clipToEnd: "none",
          motionVariant: "weak",
          openOnHover: !0,
          autoFlip: !0,
          css: {
            zIndex: 3,
            whiteSpace: "pre-wrap"
          },
          children: ""
        }),
        children: "고객용 채널 노출"
      }), u ? a(zt.HCell, {
        noWrap: !1,
        width: 48,
        children: a(Bb, {
          checked: i.length !== 0 && i.length === t.length,
          inline: !0,
          size: "medium",
          onChange: () => {
            if (i.length === t.length) {
              n([]);
              return
            }
            n(i.map(d => d.catalogItem.id))
          }
        })
      }) : null]
    })
  })
}

function W4u(e, t) {
  const n = e.title,
    r = t.title,
    i = Mpn(n[0] ?? ""),
    o = Mpn(r[0] ?? "");
  return i !== o ? i - o : n.localeCompare(r)
}
const Mpn = e => {
  const t = e.charCodeAt(0);
  return t >= 44032 && t <= 55203 ? 1 : t >= 48 && t <= 57 ? 2 : t >= 65 && t <= 90 || t >= 97 && t <= 122 ? 3 : 4
};

function U4u({
               header: e,
               category: t,
               scrollable: n,
               searchKeyword: r,
               isKioskCatalogItem: i = !1,
               showScrollButtons: o = !0
             }) {
  var G;
  const s = de(72).current,
    u = b9(),
    {
      open: l
    } = au(),
    c = E4u(),
    d = ht(),
    [h, p] = ax(),
    [f, g] = q(1),
    [m, v] = q(100),
    [b, C] = q("createdAt.desc"),
    [x, w] = q([]),
    [A, E] = q(!1),
    [T, B] = q([]),
    {
      data: S
    } = Tn(),
    F = ((G = S.business) == null ? void 0 : G.type) === "SERVICE",
    O = !Gt(r),
    P = me(() => new Set(T), [T]),
    $ = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1
    }, {
      categoryId: t == null ? void 0 : t.id
    }),
    R = me(() => {
      const J = re => x.length === 0 ? !0 : x.some(le => le === re.state),
        ae = gfr($, r).filter(J);
      return te(b).with("createdAt.desc", () => bp(ae, "catalogItem.createdAt.desc", re => Dde(re))).with("createdAt.asc", () => bp(ae, "catalogItem.createdAt.asc", re => Dde(re))).with("updatedAt.desc", () => bp(ae, "catalogItem.updatedAt.desc", re => Dde(re))).with("title.asc", () => [...ae].sort(W4u)).with("inventory.asc", () => bp(ae, "price.asc", re => {
        var le;
        return re.isStockable ? ((le = re.stockQuantity) == null ? void 0 : le.remainQuantity) ?? 1 / 0 : 1 / 0
      })).with("inventory.desc", () => bp(ae, "price.desc", re => {
        var le;
        return re.isStockable ? ((le = re.stockQuantity) == null ? void 0 : le.remainQuantity) ?? -1 / 0 : -1 / 0
      })).exhaustive()
    }, [x, $, r, b]),
    L = me(() => R.slice((f - 1) * m, f * m), [R, f, m]),
    N = $t(() => {
      B([])
    }),
    z = $t(() => {
      g(1), B([])
    });
  ie(() => {
    q4u(R.length, f, m) || 1 < f && g(f - 1)
  }, [R.length, f, m]), ie(() => {
    N()
  }, [R.length, N]), ie(() => {
    z()
  }, [t == null ? void 0 : t.id, r, z]);
  const U = async () => {
    const J = T.length;
    if (J === 0) return;
    const ae = `${J}개의 상품을 삭제할까요?`;
    ye.log(Wt.상품_관리_전체_삭제_품절_팝업, {
      message: ae
    }), await l({
      title: ae,
      description: "삭제하면 복구할 수 없어요.",
      confirmButton: {
        onClick: () => {
          ye.log(Wt.상품_관리_전체_삭제_품절_팝업_버튼_클릭, {
            message: ae,
            text: "삭제하기"
          })
        },
        text: "삭제하기",
        type: "danger"
      },
      cancelButton: {
        onClick: () => {
          ye.log(Wt.상품_관리_전체_삭제_품절_팝업_버튼_클릭, {
            message: ae,
            text: "닫기"
          })
        },
        text: "닫기",
        type: "dark"
      }
    }) && (await c({
      ids: T
    }), N())
  }, Y = async J => {
    const ae = T.length;
    if (ae === 0) return;
    const re = J === "SOLD_OUT" ? "품절표시" : "품절해제",
      se = L.filter(Te => {
        var Be;
        const Ae = (Be = Te.price.stockQuantity) == null ? void 0 : Be.remainQuantity;
        return Ae == null ? !1 : Ae <= 0
      }).length,
      be = `${ae-se}개의 상품을 ${re} 할까요?`;
    if (ye.log(Wt.상품_관리_전체_삭제_품절_팝업, {
      message: be
    }), await l({
      title: be,
      description: 0 < se ? `요청하신 ${ae}개중 ${se}개는 지금 처리할 수 없어요
(재고 또는 기타사유)` : void 0,
      confirmButton: {
        onClick: () => {
          ye.log(Wt.상품_관리_전체_삭제_품절_팝업_버튼_클릭, {
            message: be,
            text: "확인"
          })
        },
        text: "확인",
        type: "primary"
      },
      cancelButton: {
        onClick: () => {
          ye.log(Wt.상품_관리_전체_삭제_품절_팝업_버튼_클릭, {
            message: be,
            text: "닫기"
          })
        },
        text: "닫기",
        type: "dark"
      }
    })) {
      const Te = L.filter(Ae => P.has(Ae.catalogItem.id)).filter(Ae => {
        var Re;
        const Be = (Re = Ae.price.stockQuantity) == null ? void 0 : Re.remainQuantity;
        return Be == null ? !0 : Be > 0
      });
      await g7t(Te.map(Ae => j0(Ae.catalogItem)), Te.map(Ae => j0(Ae.catalogItem)).map(Ae => ({
        ...Ae,
        state: J
      }))), await Db(), d.open({
        message: `${ae-se}개의 상품을 ${re} 했어요!`,
        icon: "icn-success-color"
      }), N()
    }
  };
  return y(H, {
    direction: "row",
    css: [$e, wn],
    children: [y(H, {
      direction: "column",
      css: [wn, {
        flex: 1
      }],
      children: [e, y(H, {
        justify: "space-between",
        css: $e,
        children: [y(I.Horizontal, {
          gutter: 6,
          children: [a(L4u, {
            value: b,
            onChange: J => {
              C(J), z()
            }
          }), a(M4u, {
            value: m,
            onChange: J => {
              v(J), N()
            }
          })]
        }), a(D4u, {
          open: A,
          loading: h,
          onOpenChange: J => {
            E(J), N()
          },
          onDelete: () => p(U()),
          onSoldOut: () => p(Y("SOLD_OUT")),
          onSale: () => p(Y("ON_SALE"))
        })]
      }), a(ce, {
        size: 10
      }), a(z4u, {
        isService: F,
        totalItemLength: R.length,
        items: L,
        selectedItemIds: T,
        onSelectedItemIdsChange: B,
        filterTypes: x,
        onFilterTypesChange: J => {
          w(J), z()
        },
        isShowCheckbox: A
      }), a(G4u, {
        keyword: r,
        count: R.length
      }), a(yte, {
        ref: n.ref,
        data: L,
        itemHeight: s + 10,
        itemContent: J => {
          const ae = {
            title: a(yxe, {
              syntax: J.title,
              highlightKeyword: r
            }),
            menuItem: J,
            isService: F,
            onClick: async () => {
              ye.log(Wt.상품관리_상품선택, {
                catalogItemId: J.catalogItem.id,
                catalogItemTitle: J.title
              }), (await u({
                mode: "edit",
                itemId: J.catalogItem.id,
                isKioskCatalogItem: i
              })).type === "delete" && N()
            },
            useCheckbox: A,
            checked: A ? P.has(J.catalogItem.id) : !1,
            onCheckboxClick: re => {
              if (P.has(re)) {
                B(T.filter(le => le !== re));
                return
              }
              B(T.concat(re))
            }
          };
          return a(R4u, {
            ...ae,
            isService: F,
            css: {
              height: s,
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: `72px 1fr ${F?"100px":""} 110px 110px 110px ${ae.useCheckbox?"48px":""}`
            }
          }, J.key)
        },
        footer: y(H.Center, {
          direction: "column",
          css: $e,
          children: [a(ce, {
            size: 30
          }), 0 < R.length ? a(p_r, {
            page: f,
            siblingCount: 1,
            count: Math.ceil(R.length / m),
            onChange: (J, ae) => {
              N(), g(ae)
            }
          }) : null]
        }),
        listEmptyComponent: O ? a(j4u, {}) : a(H4u, {
          category: t
        }),
        css: [$e, {
          paddingBottom: 200
        }]
      })]
    }), o ? y(Q, {
      children: [a(ce, {
        direction: "horizontal",
        size: 30
      }), a(bM, {
        scrollable: n,
        css: {
          height: "75%"
        }
      })]
    }) : null]
  })
}

function H4u({
               category: e
             }) {
  const t = b9();
  return a(H.Center, {
    css: {
      width: "100%",
      padding: "48px 0"
    },
    children: a(Yd, {
      figure: a($r.Lottie, {
        src: "https://static.toss.im/lotties/spot-empty.json",
        loop: !1,
        scale: 1
      }),
      title: "등록된 상품이 없어요",
      description: "상품을 등록해주세요 ",
      buttons: a(Yd.Button, {
        type: "primary",
        onClick: async () => {
          await t({
            mode: "create",
            category: e
          })
        },
        children: "상품 추가"
      })
    })
  })
}

function j4u() {
  return a(Yd, {
    css: {
      marginTop: 80
    },
    figure: a($r.Lottie, {
      src: "https://static.toss.im/lotties/spot-empty.json",
      loop: !1,
      scale: 1
    }),
    title: "검색 결과가 없어요"
  })
}

function G4u({
               keyword: e,
               count: t
             }) {
  return ie(() => {
    e != null && e !== "" && ye.log(Wt.키오스크_관리_상품_검색_결과_임프레션, {
      query: e,
      resultCount: t
    })
  }, [e, t]), a(Q, {})
}

function q4u(e, t, n) {
  return t <= Math.ceil(e / n)
}

function e7e({
               menuItem: e,
               checked: t,
               onClick: n,
               className: r
             }) {
  const i = Gt(e.catalogItem.imageUrl) ? "https://static.toss.im/illusts/tossplace-empty_app.png" : e.catalogItem.imageUrl;
  return a(H, {
    align: "center",
    justify: "space-between",
    css: [$e, {
      backgroundColor: t ? _.blue50 : void 0
    }],
    className: r,
    children: y(H, {
      align: "center",
      onClick: n,
      css: {
        flex: 1,
        maxWidth: "calc(100% - 90px)"
      },
      children: [a(Y5t, {
        checked: t,
        onChange: n,
        css: {
          marginLeft: 20
        }
      }), a(ue, {
        left: a(ue.Image, {
          type: "square",
          src: i
        }),
        contents: a(ue.Texts, {
          type: "2RowTypeA",
          top: a("span", {
            css: {
              fontWeight: "bold",
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            },
            children: e.title
          }),
          topProps: {
            color: M.grey700,
            fontWeight: "bold"
          },
          bottom: fe(e.price.priceValue),
          bottomProps: {
            color: M.grey700
          }
        }),
        css: [Ft, {
          flex: 1,
          "& > div": {
            paddingTop: 10,
            paddingBottom: 10
          }
        }]
      })]
    })
  })
}
e7e.HEIGHT = 74;
const Y4u = 107;

function K4u({
               open: e,
               onClose: t
             }) {
  const n = p0();
  Ht(rr(n), "카테고리를 필수로 생성해야 합니다.");
  const r = ht(),
    i = ro(),
    {
      enabledFeatures: o
    } = Qw(),
    [s, u] = q(n[0].id),
    l = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1
    }, {
      categoryId: s
    }),
    c = me(() => bp(l, "catalogItem.kioskOrder.asc", T => T).filter(T => T.catalogItem.kioskEnabled === !0), [l]);
  ie(() => {
    h(c)
  }, [c]);
  const [d, h] = q(c), [p, f] = q(), {
    openConfirm: g
  } = gn(), {
    mutateAsync: m,
    isPending: v
  } = lt({
    mutationFn: async () => {
      const T = d.map(S => j0(S.catalogItem)),
        B = d.map((S, F) => j0({
          ...S.catalogItem,
          kioskOrder: F
        }));
      await g7t(T, B)
    },
    onSuccess: () => {
      r.open({
        icon: "icn-success-color",
        message: "편집한 내용을 저장했어요"
      }), Db()
    }
  }), b = async T => {
    c.every((S, F) => {
      var O;
      return S.catalogItem.id === ((O = d[F]) == null ? void 0 : O.catalogItem.id)
    }) || await m(), u(T), x()
  }, C = async () => {
    c.every((B, S) => {
      var F;
      return B.catalogItem.id === ((F = d[S]) == null ? void 0 : F.catalogItem.id)
    }) || await g({
      title: "변경사항을 저장하지 않고 나갈까요?",
      cancelButton: a(he, {
        type: "danger",
        style: "weak",
        children: "나가기"
      }),
      confirmButton: "저장하기"
    }) && await m()
  }, x = () => {
    f(void 0)
  }, w = async () => {
    await C(), t()
  }, A = async () => {
    await m(), x()
  }, E = T => {
    var S;
    const B = T.findIndex(F => F.catalogItem.id === p);
    0 <= B && ((S = i.elem) == null || S.scrollTo({
      top: (B - 3) * e7e.HEIGHT
    }))
  };
  return a(W, {
    screen: {
      schemaId: Wt.상품_관리_상품_순서_편집_팝업
    },
    children: y(xe, {
      onClose: w,
      open: e,
      css: {
        overflow: "hidden"
      },
      children: [a(W, {
        click: {
          schemaId: Wt.상품_관리_상품_순서_편집_팝업_버튼_클릭,
          params: {
            text: "x"
          }
        },
        children: a(xe.CloseButton, {
          onClick: w,
          disableDialogClose: !0
        })
      }), y(I.Vertical, {
        gutter: 12,
        align: "stretch",
        css: {
          padding: "40px 100px 20px 60px"
        },
        children: [y(H.CenterVertical, {
          align: "center",
          justify: "space-between",
          children: [a(xe.Title, {
            children: a(ne, {
              typography: "h6",
              fontWeight: "semibold",
              color: _.grey800,
              children: "순서편집"
            })
          }), a(X4u, {
            menuItems: d,
            selectedId: p,
            onChange: T => {
              E(T), h(T)
            }
          })]
        }), a(ne, {
          typography: "p",
          color: _.grey600,
          children: `${o.join("・")}에 순서가 반영되요`
        })]
      }), a(txr, {
        categories: n,
        selectedCategoryId: s,
        onSelectCategoryId: T => {
          T != null && b(T)
        },
        withAll: !1,
        css: wt({
          left: 60,
          right: 100
        })
      }), a(ce, {
        size: 10
      }), a("div", {
        css: wt({
          left: 60,
          right: 100
        }),
        children: a(ba, {
          css: {
            height: 1
          }
        })
      }), y(H, {
        css: {
          position: "relative",
          flex: 1,
          overflow: "auto"
        },
        children: [a(yte, {
          ref: i.ref,
          data: d,
          itemHeight: e7e.HEIGHT,
          itemContent: T => a(e7e, {
            menuItem: T,
            checked: p === T.catalogItem.id,
            onClick: () => f(T.catalogItem.id),
            css: {
              borderBottom: `1px solid ${_.grey200}`
            }
          }, T.catalogItem.id),
          listEmptyComponent: a(Q4u, {}),
          css: [$e, {
            padding: "0 25px 0 60px"
          }]
        }), a(bM, {
          scrollable: i,
          css: wn
        }), a(ce, {
          direction: "horizontal",
          size: 25
        })]
      }), a(ce, {
        size: 20
      }), a(xe.BottomActions, {
        css: {
          height: Y4u,
          padding: "22px 100px"
        },
        children: y(I.Horizontal, {
          justify: "flex-end",
          gutter: 12,
          css: $e,
          children: [a(W, {
            click: {
              schemaId: Wt.상품_관리_상품_순서_편집_팝업_버튼_클릭,
              params: {
                text: "취소"
              }
            },
            children: a(Ye, {
              size: "xlarge",
              disabled: v,
              onClick: w,
              children: "취소"
            })
          }), a(W, {
            click: {
              schemaId: Wt.상품_관리_상품_순서_편집_팝업_버튼_클릭,
              params: {
                text: "저장"
              }
            },
            children: a(Ye, {
              type: "primary",
              size: "xlarge",
              css: {
                minWidth: 160
              },
              loading: v,
              onClick: A,
              children: "저장"
            })
          })]
        })
      })]
    })
  })
}

function X4u({
               menuItems: e,
               selectedId: t,
               onChange: n
             }) {
  const r = e.findIndex(l => l.catalogItem.id === t),
    i = t != null && r > 0,
    o = t != null && r < e.length - 1,
    s = () => {
      n(one(e, r))
    },
    u = () => {
      n(ane(e, r))
    };
  return y(I.Horizontal, {
    gutter: 8,
    children: [a(W, {
      click: {
        schemaId: Wt.카테고리_순서편집_위로_버튼_클릭
      },
      children: a(Ye, {
        leftAddon: a(xn, {
          name: "icon-arrow-increase"
        }),
        type: "primary",
        variant: "weak",
        disabled: !i,
        onClick: s,
        children: "위로"
      })
    }), a(W, {
      click: {
        schemaId: Wt.카테고리_순서편집_아래로_버튼_클릭
      },
      children: a(Ye, {
        leftAddon: a(xn, {
          name: "icon-arrow-decrease"
        }),
        type: "primary",
        variant: "weak",
        disabled: !o,
        onClick: u,
        children: "아래로"
      })
    })]
  })
}

function Q4u() {
  return a(H.Center, {
    css: {
      width: "100%",
      padding: "48px 0"
    },
    children: a(Yd, {
      figure: a($r.Lottie, {
        src: "https://static.toss.im/lotties/spot-empty.json",
        loop: !1,
        scale: 1
      }),
      title: "등록된 상품이 없어요"
    })
  })
}

function Z4u() {
  return K(() => new Promise(e => {
    yn.open(({
               isOpen: t,
               unmount: n
             }) => a(Oe, {
      fallback: null,
      children: a(K4u, {
        open: t,
        onClose: () => {
          e(), n()
        }
      })
    }))
  }), [])
}

function qBt({
               onCtrlFPress: e,
               onEscPress: t,
               children: n
             }) {
  const [r, i] = q(null);
  return xfr({
    onCtrlFPress: o => {
      e == null || e(o), o.defaultPrevented || r == null || r.focus()
    },
    onEscPress: o => {
      t == null || t(o), o.defaultPrevented || r == null || r.blur()
    }
  }), a(Q, {
    children: n({
      inputRef: i
    })
  })
}

function Rze({
               kioskEnabled: e = !1,
               isKioskCatalogItem: t = !1
             }) {
  const n = Es(),
    r = an(),
    i = p0(),
    [o, s] = q(),
    u = i.find(v => v.id === o),
    {
      data: l
    } = rx(),
    c = (l == null ? void 0 : l.catalogManagement) === !0,
    d = b9(),
    h = Z4u(),
    {
      value: p,
      debouncedValue: f,
      updateValue: g
    } = hL({
      defaultValue: "",
      wait: 300
    });
  uCe({
    onScan: v => {
      ye.log(Wt.바코드_스캔, {
        barcode: v,
        referrer: Wt.상품관리
      }), g(v)
    }
  });
  const m = ro({
    enableScrollPositions: !0
  });
  return a(W, {
    screen: {
      schemaId: Wt.상품관리
    },
    children: y(St, {
      children: [a(St.Header, {
        title: y(H, {
          direction: "row",
          align: "center",
          children: ["상품", a(qBt, {
            onCtrlFPress: () => {
              ye.log(Wt.키오스크_관리_검색_단축키_백그라운드)
            },
            onEscPress: v => {
              v.target !== document.body && v.target === document.activeElement && ye.log(Wt.키오스크_관리_검색_닫기_단축키_백그라운드)
            },
            children: ({
                         inputRef: v
                       }) => a(Me, {
              size: "small",
              css: {
                marginLeft: 20
              },
              children: a(Me.Search, {
                ref: v,
                placeholder: "메뉴명 또는 초성 검색",
                value: p,
                onChange: b => g(b.target.value),
                onClear: () => g(""),
                onClick: () => {
                  ye.log(Wt.키오스크_관리_상품_검색창_클릭)
                }
              })
            })
          })]
        }),
        rightAddon: y(Q, {
          children: [a(W, {
            click: {
              schemaId: Wt.상품_관리_상품_순서_편집_버튼_클릭
            },
            children: a(he, {
              size: "medium",
              style: "weak",
              onClick: () => {
                if (e) {
                  h();
                  return
                }
                r({
                  to: "/main/order",
                  search: {
                    menuMode: "edit",
                    referrer: n.pathname
                  }
                })
              },
              children: "순서 편집"
            })
          }), c ? null : a(W, {
            click: {
              schemaId: Wt.상품관리_상품추가_버튼_클릭
            },
            children: a(he, {
              size: "medium",
              onClick: async () => {
                await d({
                  mode: "create",
                  kioskEnabled: e,
                  isKioskCatalogItem: t
                })
              },
              children: " 상품 추가"
            })
          })]
        }),
        css: {
          marginBottom: 12
        }
      }), a(St.Content, {
        children: a(U4u, {
          header: y(Q, {
            children: [a(txr, {
              categories: i,
              selectedCategoryId: o,
              onSelectCategoryId: v => {
                s(v)
              }
            }), a(ce, {
              size: 20
            })]
          }),
          category: u,
          scrollable: m,
          searchKeyword: f,
          isKioskCatalogItem: t,
          showScrollButtons: !1
        })
      })]
    })
  })
}

function J4u() {
  return a(Oe, {
    children: a(Rze, {
      kioskEnabled: !0
    })
  })
}
const e7u = Et("/main/booking/link-booking/items")({
  component: () => a(Gre, {
    children: a(J4u, {})
  })
});

function sen({
               name: e,
               inline: t
             }) {
  const {
    control: n
  } = ot();
  return a(Tt, {
    control: n,
    name: e,
    render: ({
               field: {
                 value: r,
                 onChange: i
               }
             }) => a(Bb, {
      checked: !!r,
      label: "자리이동 주문서 출력",
      inline: t,
      onChange: o => {
        i(o.currentTarget.checked)
      }
    })
  })
}

function mns({
               width: e = 80,
               height: t = 80,
               imageUrl: n,
               imageSize: r = 80,
               isSelected: i = !1,
               onSelect: o,
               className: s
             }) {
  return a(yns, {
    "aria-label": "기본 이미지 선택",
    css: {
      width: e,
      height: t,
      pointerEvents: "auto"
    },
    className: s,
    onClick: () => {
      o == null || o(n)
    },
    children: a(oo, {
      css: {
        position: "relative",
        width: "100%",
        height: "100%"
      },
      children: y(oo.Center, {
        css: {
          position: "relative",
          backgroundColor: D.grey100,
          borderRadius: 8,
          overflow: "hidden",
          width: "100%",
          height: "100%"
        },
        children: [a(An, {
          frameShape: {
            width: r,
            height: r
          },
          src: n,
          "aria-hidden": !0
        }), i ? y(Q, {
          children: [a(rt, {
            css: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            frameShape: gt.CleanW24,
            name: "icon-check-mono",
            color: "white",
            "aria-hidden": !0
          }), a(vns, {})]
        }) : null]
      })
    })
  })
}
const yns = nt.label`
  display: block;
  cursor: pointer;
`,
  vns = nt.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${D.greyOpacity500};
`;

function uen({
               name: e,
               label: t,
               labelRightAddOn: n,
               readOnly: r = !1
             }) {
  const {
    control: i
  } = ot();
  return y(vu.Horizontal, {
    justify: "space-between",
    align: "center",
    css: {
      width: "100%"
    },
    children: [y(vu.Horizontal, {
      justify: "space-between",
      align: "center",
      gutter: 0,
      children: [a(Le, {
        color: lr.grey800,
        fontWeight: "semibold",
        children: t
      }), n ?? null]
    }), a(Tt, {
      name: e,
      control: i,
      render: ({
                 field: {
                   value: o,
                   onChange: s
                 }
               }) => a(Cb, {
        size: "large",
        checked: o,
        readOnly: r,
        onChange: s
      })
    })]
  })
}
const G6 = {
    id: -99999,
    title: "즐겨찾기",
    kioskEnabled: !0,
    kioskOrder: -2,
    order: -2,
    default: !1,
    franchiseNewBadge: !1,
    franchiseUpdateBadge: !1
  },
  vS = {
    id: -99998,
    title: "선불권",
    kioskEnabled: !0,
    kioskOrder: -1,
    order: -1,
    default: !1,
    franchiseNewBadge: !1,
    franchiseUpdateBadge: !1
  };
async function bns() {
  const {
    optionSets: e
  } = await Se.get("/api/pos/v1/catalog/option-sets", {
    cacheMode: bh() ? "use-cache" : "store-cache"
  }), t = e.map(n => ({
    ...n,
    isRequired: n.minChoices > 0
  }));
  return t.sort((n, r) => n.order - r.order), t
}

function GA() {
  const {
    data: e
  } = st({
    queryKey: qC.itemOptions,
    queryFn: bns
  });
  return e
}
async function Cns() {
  const e = await Jp.get("businessType");
  let t = 0,
    n = 0,
    r;
  const i = [];
  for (; 0 <= n && t < 100;) {
    const {
      items: o,
      lastUpdatedAt: s,
      offset: u
    } = await Se.get("/api/pos-orchestrator/v1/items", {
      headers: {
        "toss-pos-business-type": e
      },
      searchParams: Mf.create({
        size: 500,
        offset: n
      })
    });
    i.push(...o), new Date(r ?? 0) < new Date(s ?? 0) && (r = s), n = u, t += 1
  }
  return {
    items: i.filter(o => !o.category.default),
    lastUpdatedAt: r
  }
}
async function xns(e) {
  const t = await Jp.get("businessType"),
    {
      items: n,
      lastUpdatedAt: r
    } = await Se.get("/api/pos-orchestrator/v1/items", {
      searchParams: {
        ...e
      },
      headers: {
        "toss-pos-business-type": t
      }
    }),
    [i, o] = S1(n, s => s.state === "DELETED");
  return {
    recentlyDeletedCatalogItems: i,
    recentlyUpdatedCatalogItems: o,
    lastUpdatedAt: r
  }
}
let yV = null,
  $$ = [];
const wns = 100,
  _ns = new kyt;
async function Ans({
                     minCacheLength: e = wns
                   } = {}) {
  if (yV == null || $$.length < e) {
    const {
      items: i,
      lastUpdatedAt: o
    } = await Cns();
    return yV = o != null ? new Date(o) : yV, $$ = i, i
  }
  const {
    recentlyDeletedCatalogItems: t,
    recentlyUpdatedCatalogItems: n,
    lastUpdatedAt: r
  } = await xns({
    afterUpdatedAt: yV.toISOString(),
    withDeleted: !0
  });
  return yV = r != null ? new Date(r) : yV, 0 < n.length && ($$ = QRn(n, $$, i => i.id)), 0 < t.length && ($$ = $$.filter(i => !t.some(o => i.id === o.id))), $$
}
async function J8t(e = {}) {
  return await Ugn({
    key: "fetchCachedCatalogItems",
    cacheRegistry: _ns,
    cacheMode: bh() ? "use-cache" : "store-cache",
    fetcher: async () => await Ans(e)
  })
}
J8t.clearCache = () => {
  yV = null, $$ = []
};
async function Ens() {
  const {
    favoriteMenus: e
  } = await Se.get("/api/pos/v1/catalog/favorites/menus", {
    cacheMode: bh() ? "use-cache" : "store-cache"
  });
  return e
}

function eDt() {
  return st({
    ...qs.allVouchers
  })
}

function Spt(e) {
  return {
    key: `VOUCHER/${e.itemType}/${e.id}`,
    type: "VOUCHER",
    state: "ON_SALE",
    category: vS,
    title: e.title,
    position: e.position,
    color: e.color,
    voucherItem: e,
    price: {
      id: -1,
      title: "기본",
      isDefault: !0,
      state: "ON_SALE",
      sku: null,
      barcode: null,
      priceType: e.itemPrice.priceType,
      priceUnit: 1,
      priceValue: e.itemPrice.priceValue,
      isTaxFree: !1,
      isStockable: !1,
      stockQuantity: null
    }
  }
}

function tDt(e) {
  return e != null && sM(new Date(e), new Date)
}

function Ra({
              withFavorite: e,
              withPrepaidVoucher: t
            }, {
              categoryId: n
            } = {}) {
  const r = GA(),
    {
      data: i
    } = st({
      queryKey: qC.favoriteMenus,
      queryFn: () => Ens()
    }),
    {
      data: o
    } = st({
      queryKey: qC.items(),
      queryFn: () => J8t()
    }),
    {
      data: s
    } = eDt(),
    u = me(() => o.map(({
                          optionSets: p,
                          ...f
                        }) => ({
      ...f,
      options: PRe(r, p, (g, m) => g.id === m.id)
    })), [o, r]),
    l = me(() => e ? i.map(p => Dns(p, u)).filter(or) : [], [u, i, e]),
    c = me(() => t ? s.filter(p => !tDt(p.expiredAt)).map(Spt) : [], [t, s]),
    d = me(() => [...l, ...c, ...u.map(RRe)], [u, l, c]);
  return me(() => n != null ? d.filter(p => p.category.id === n) : d, [n, d])
}
const Dns = (e, t) => {
  const n = t.find(u => u.id === e.itemId);
  if (n == null) return null;
  const r = n.prices.find(u => u.id === e.itemPriceId);
  Ht(r != null);
  const i = n.options.flatMap(u => u.choices),
    o = e.optionChoiceIds.map(u => i.find(l => l.id === u)).filter(or);
  return {
    key: `FAVORITE_MENU/${e.id}`,
    type: "FAVORITE_MENU",
    favoriteMenuId: e.id,
    category: G6,
    position: e.position,
    title: e.title,
    state: n.state,
    catalogItem: n,
    price: r,
    optionChoices: o,
    color: e.color
  }
};

function Trr(e) {
  const n = Ra({
    withFavorite: !1,
    withPrepaidVoucher: !1
  }).find(r => r.catalogItem.id === e);
  if (n == null) throw new Error(`"${e}"에 해당하는 CatalogItem을 찾을 수 없습니다.`);
  return n.catalogItem
}

function Tns(e) {
  const n = Ra({
    withFavorite: !1,
    withPrepaidVoucher: !1
  }).find(r => r.catalogItem.id === e);
  return n == null ? void 0 : n.catalogItem
}
const Brr = _n({
    features: {},
    fallback: () => !0,
    role: ""
  }),
  Bns = Brr.Provider;

function Sns() {
  return bt(Brr)
}

function kns() {
  const {
    fallback: e,
    features: t,
    role: n
  } = Sns();
  return {
    hasPermission: K(i => {
      const o = t[i];
      return o == null ? e(i) : o.hasPermission(n)
    }, [e, n, t])
  }
}

function ps({
              feature: e,
              behaviour: t,
              children: n
            }) {
  const {
    hasPermission: r
  } = kns(), i = me(() => r(e), [e, r]);
  if (t === "disable") {
    const o = mr.only(n);
    if (Dr(o)) return i ? o : xr(o, {
      ...o.props,
      disabled: !0
    })
  } else if (t === "hidden") return i ? a(Q, {
    children: n
  }) : a(Q, {});
  throw new Error(`Unknown behaviour: ${t}`)
}

function Fns({
               fields: e = {},
               fallback: t = () => !0,
               role: n,
               ...r
             }) {
  return a(Bns, {
    value: {
      features: e,
      fallback: t,
      role: n
    },
    children: a("form", {
      ...r
    })
  })
}

function Srr({
               allows: e,
               isAllowed: t,
               ...n
             }) {
  return a(Fns, {
    fallback: r => t ? !0 : e.includes(r),
    role: "",
    ...n
  })
}
const Wt = {
  카테고리_편집_다이얼로그: 1233673,
  카테고리_편집_상단메뉴_버튼_클릭: 1233675,
  카테고리_편집_새카테고리_추가_버튼_클릭: 1233677,
  카테고리_편집_카테고리_수정_버튼_클릭: 1233679,
  카테고리_편집_카테고리_수정_저장_버튼_클릭: 1233681,
  카테고리_순서편집_다이얼로그: 1233687,
  카테고리_순서편집_뒤로가기_버튼_클릭: 1233691,
  카테고리_순서편집_카테고리_선택: 1233693,
  카테고리_순서편집_위로_버튼_클릭: 1233695,
  카테고리_순서편집_아래로_버튼_클릭: 1233697,
  카테고리_순서편집_CTA버튼_클릭: 1233699,
  카테고리_순서편집_저장확인얼랏: 1233689,
  카테고리_순서편집_저장확인얼랏_CTA버튼_클릭: 1233703,
  옵션_편집추가_다이얼로그: 1233705,
  옵션_편집추가_옵션_선택: 1233707,
  옵션_편집추가_새옵션_버튼_클릭: 1233709,
  옵션_편집추가_X버튼_클릭: 1233713,
  옵션_등록수정_다이얼로그: 1233717,
  옵션_등록수정_CTA버튼_클릭: 1233719,
  옵션_등록수정_X버튼_클릭: 1233721,
  옵션_등록수정_기본값으로_체크할_항목선택: 1233725,
  옵션_등록수정_옵션삭제확인얼랏: 1233729,
  옵션_등록수정_옵션삭제확인얼랏_CTA버튼_클릭: 1233733,
  옵션_등록수정_옵션수정확인얼랏: 1233731,
  옵션_등록수정_옵션수정확인얼랏_CTA버튼_클릭: 1233735,
  옵션_등록수정_기본값설정_다이얼로그: 1233737,
  옵션_등록수정_기본값설정_옵션선택: 1233739,
  옵션_등록수정_기본값설정_CTA버튼_클릭: 1233741,
  옵션_등록수정_기본값설정_뒤로가기_버튼_클릭: 1233745,
  옵션_등록수정_품절_클릭: 1328075,
  옵션_등록수정_키오스크_아이콘_노출_클릭: 1328077,
  옵션_순서편집_다이얼로그: 1261379,
  옵션_순서편집_취소버튼_클릭: 1261381,
  옵션_순서편집_저장버튼_클릭: 1261383,
  옵션_순서편집_X버튼_클릭: 1261385,
  상품_등록수정_다이얼로그: 1233747,
  상품_등록수정_옵션선택_버튼_클릭: 1233749,
  상품_등록수정_상품에넣을옵션_클릭: 1233751,
  상품_등록수정_새옵션추가_버튼_클릭: 1233753,
  상품_등록수정_세금과세여부_선택: 1233757,
  상품_등록수정_키오스크_노출_토글: 1255199,
  상품_등록수정_CTA_클릭: 1233759,
  상품_등록수정_X버튼_클릭: 1233761,
  상품_등록수정_중복되는_이름의_상품이_있어요_토스트: 1233763,
  상품_등록수정_품절표시_클릭: 1254039,
  상품_등록수정_옵션_상세설정_필수여부_토글: 1233769,
  상품_등록수정_옵션_상세설정_기본값으로_체크할_항목을_정해주세요: 1233777,
  상품_등록수정_옵션_상세설정_기본값설정옵션등록_옵션_선택: 1233781,
  상품_등록수정_시가_클릭: 1271767,
  즐겨찾는_메뉴_등록수정_다이얼로그: 1233795,
  즐겨찾는_메뉴_등록수정_카테고리_선택: 1233797,
  즐겨찾는_메뉴_등록수정_메뉴_선택: 1233799,
  즐겨찾는_메뉴_등록수정_색상_선택: 1233801,
  즐겨찾는_메뉴_등록수정_옵션선택_버튼_클릭: 1233803,
  즐겨찾는_메뉴_등록수정_CTA_클릭: 1233805,
  즐겨찾는_메뉴_등록수정_X버튼_클릭: 1233807,
  즐겨찾는_메뉴_등록수정_옵션등록_다이얼로그: 1233809,
  즐겨찾는_메뉴_등록수정_옵션등록_CTA_클릭: 1233813,
  즐겨찾는_메뉴_등록수정_옵션등록_뒤로가기_버튼_클릭: 1233817,
  즐겨찾는_옵션_추가하기_다이얼로그: 1233819,
  즐겨찾는_옵션_추가하기_옵션_클릭: 1233821,
  즐겨찾는_옵션_추가하기_X버튼_클릭: 1233823,
  상품관리: 1255397,
  상품관리_상품추가_버튼_클릭: 1255401,
  상품관리_순서편집_버튼_클릭: 1255403,
  상품관리_태그_변경: 1255411,
  상품관리_노출여부_변경: 1255413,
  상품관리_상품선택: 1257233,
  상품관리_상품한번에등록_버튼_클릭: 1321593,
  상품관리_재고수량_클릭: 1329051,
  상품관리_필터_팝업: 1329049,
  상품관리_필터_팝업_필터_클릭: 1329053,
  옵션관리: 1255415,
  옵션관리_옵션추가_버튼_클릭: 1255419,
  옵션관리_순서편집_버튼_클릭: 1255421,
  옵션관리_노출여부_토글: 1255429,
  옵션관리_옵션선택: 1257239,
  카테고리관리: 1255465,
  카테고리관리_추가_버튼_클릭: 1255471,
  카테고리관리_순서편집_버튼_클릭: 1255473,
  카테고리관리_영어표기_버튼_클릭: 1365396,
  카테고리관리_노출여부_토글: 1255481,
  카테고리관리_카테고리_선택: 1257245,
  할인관리: 1267123,
  할인관리_추가_버튼_클릭: 1267125,
  할인관리_할인_선택: 1267127,
  토스지원_할인받기_토글_클릭: 1652794,
  토스지원_할인받기_동의_완료_토스트_임프레션: 1653312,
  카테고리_순서편집_즐겨찾기_사용_토글_클릭: 1298267,
  키오스크_관리_상품_검색창_클릭: 1299587,
  키오스크_관리_상품_검색_결과_임프레션: 1299589,
  키오스크_관리_검색_단축키_백그라운드: 1300255,
  키오스크_관리_검색_닫기_단축키_백그라운드: 1300605,
  상품_등록_수정_재고_관리_클릭: 1301465,
  상품_등록_수정_재고_관리_수량_클릭: 1301467,
  재고_관리_수량_더하기_빼기: 1301479,
  재고_관리_수량_더하기_빼기_취소_클릭: 1301489,
  재고_관리_수량_더하기_빼기_CTA_클릭: 1301481,
  재고_관리_수량_더하기_빼기_단축키_클릭: 1301487,
  재고_관리_수량_더하기_빼기_수량_설정_클릭: 1301483,
  재고_관리_수량_더하기_빼기_사유_클릭: 1301485,
  재고_관리_수량_더하기_빼기_사유: 1301491,
  재고_관리_수량_더하기_빼기_사유_삭제_클릭: 1301495,
  재고_관리_수량_더하기_빼기_사유_저장_클릭: 1301493,
  키오스크_관리_품절_표시_클릭: 1301525,
  상품_등록_수정_바코드_X_버튼_클릭: 1306179,
  상품_등록_수정_이미_등록된_바코드에요_팝업: 1306173,
  상품_등록_수정_이미_등록된_바코드에요_팝업_확인_클릭: 1306181,
  상품_등록_수정_바코드가_등록된_상품이에요_팝업: 1306175,
  상품_등록_수정_바코드가_등록된_상품이에요_확인_클릭: 1306183,
  상품_등록_수정_바코드를_삭제할까요_팝업: 1306177,
  상품_등록_수정_바코드를_삭제할까요_팝업_버튼_클릭: 1306185,
  바코드_스캔: 1306189,
  상품_등록_수정_다이얼로그_바코드_자동생성_클릭: 1596013,
  옵션_등록_수정_노출_설정_토글_클릭: 1299163,
  상품_등록_수정_다이얼로그_카테고리_추가하기_클릭: 1385794,
  상품_관리_전체_삭제_품절_버튼_클릭: 1445423,
  상품_관리_전체_삭제_품절_팝업: 1445421,
  상품_관리_전체_삭제_품절_팝업_버튼_클릭: 1445425,
  상품_관리_카테고리_토글_클릭: 1448917,
  상품_소요시간_클릭: 1497981,
  상품관리_x_버튼_클릭: 1446147,
  상품_관리_페이지_필터_팝업: 1449269,
  상품_관리_페이지_필터_팝업_필터_클릭: 1449271,
  상품_관리_상품_순서_편집_버튼_클릭: 1255403,
  상품_관리_상품_순서_편집_팝업: 1255399,
  상품_관리_상품_순서_편집_팝업_버튼_클릭: 1255407,
  옵션_등록_수정_다이얼로그_순서편집_클릭: 1462115,
  상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업: 1507539,
  상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업_버튼_클릭: 1507541
};
async function krr(e) {
  const t = await Jp.get("businessType"),
    n = ako(e);
  return await Se.post("/api/pos-orchestrator/v1/items", {
    json: n,
    headers: {
      "toss-pos-business-type": t
    }
  })
}
const $P = {
    screen: ["kiosk", "screen"],
    orderPayload: ["kiosk", "orderPayload"],
    installedDevices: ["kiosk", "installedDevices"],
    franchiseSettings: ["kiosk", "franchiseSettings"]
  },
  rx = () => st({
    queryKey: $P.franchiseSettings,
    queryFn: u6n,
    select: e => e.franchise
  });
async function Frr() {
  const {
    categories: e
  } = await Se.get("/api/pos/v1/catalog/categories", {
    cacheMode: bh() ? "use-cache" : "store-cache"
  });
  return e.filter(t => !t.default)
}

function p0() {
  const {
    data: e
  } = st({
    queryKey: qC.categories,
    queryFn: () => Frr()
  });
  return e.sort((t, n) => t.order - n.order), e
}
const $ns = () => {
    const e = p0(),
      t = F8(e),
      n = K(() => {
        const r = k1(t, e, i => i.id);
        r.edited.forEach(i => {
          Fn.emit({
            name: "category.change.event",
            callbackId: Nn(),
            data: {
              event: "update",
              category: i
            }
          })
        }), r.added.forEach(i => {
          Fn.emit({
            name: "category.change.event",
            callbackId: Nn(),
            data: {
              event: "add",
              category: i
            }
          })
        }), r.deleted.forEach(i => {
          Fn.emit({
            name: "category.change.event",
            callbackId: Nn(),
            data: {
              event: "delete",
              category: i
            }
          })
        })
      }, [e, t]);
    return ie(() => {
      n()
    }, [n]), null
  },
  Ins = () => {
    const e = Ra({
        withFavorite: !1,
        withPrepaidVoucher: !1
      }),
      t = F8(e),
      n = K(() => {
        k1(t, e, o => o.key, (o, s) => o.state === s.state).edited.forEach(o => {
          o.state === "ON_SALE" ? Fn.emit({
            name: "catalog.change.event",
            callbackId: Nn(),
            data: {
              event: "on-sale",
              catalog: o.catalogItem
            }
          }) : Fn.emit({
            name: "catalog.change.event",
            callbackId: Nn(),
            data: {
              event: "sold-out",
              catalog: o.catalogItem
            }
          })
        })
      }, [e, t]),
      r = K(() => {
        const i = k1(t, e, o => o.key);
        i.edited.forEach(o => {
          Fn.emit({
            name: "catalog.change.event",
            callbackId: Nn(),
            data: {
              event: "update",
              catalog: o.catalogItem
            }
          })
        }), i.added.forEach(o => {
          Fn.emit({
            name: "catalog.change.event",
            callbackId: Nn(),
            data: {
              event: "add",
              catalog: o.catalogItem
            }
          })
        }), i.deleted.forEach(o => {
          Fn.emit({
            name: "catalog.change.event",
            callbackId: Nn(),
            data: {
              event: "delete",
              catalog: o.catalogItem
            }
          })
        })
      }, [e, t]);
    return ie(() => {
      n(), r()
    }, [n, r]), null
  },
  Pns = () => {
    const e = GA(),
      t = F8(e),
      n = K(() => {
        const r = k1(t, e, i => i.id);
        r.edited.forEach(i => {
          Fn.emit({
            name: "option.change.event",
            callbackId: Nn(),
            data: {
              event: "update",
              option: i
            }
          })
        }), r.added.forEach(i => {
          Fn.emit({
            name: "option.change.event",
            callbackId: Nn(),
            data: {
              event: "add",
              option: i
            }
          })
        }), r.deleted.forEach(i => {
          Fn.emit({
            name: "option.change.event",
            callbackId: Nn(),
            data: {
              event: "delete",
              option: i
            }
          })
        })
      }, [e, t]);
    return ie(() => {
      n()
    }, [n]), null
  };

function KLe(e) {
  var r, i, o;
  const t = mk({
      queryKey: E1.ordersList(e),
      queryFn: async ({
                        pageParam: s
                      }) => {
        const u = await Jyt({
          ...e,
          page: s
        });
        return {
          ...u,
          next: u.last ? void 0 : s + 1
        }
      },
      initialPageParam: 1,
      getNextPageParam: s => s.next
    }),
    n = me(() => {
      var s;
      return (s = t.data) == null ? void 0 : s.pages.flatMap(u => u.orders)
    }, [(r = t.data) == null ? void 0 : r.pages]);
  return {
    ...t,
    orders: n,
    count: (o = (i = t.data) == null ? void 0 : i.pages[0]) == null ? void 0 : o.totalElements
  }
}
const Ons = () => {
    const {
      orders: e = []
    } = KLe({
      start: Ue(new Date, "yyyy-MM-dd"),
      end: Ue(new Date, "yyyy-MM-dd"),
      size: 100
    }), t = F8(e);
    return ie(() => {
      const n = k1(t, e, r => r.id, (r, i) => r.state === i.state);
      n.edited.length !== 0 && n.edited.forEach(r => {
        r.state === "REFUNDED" && Fn.emit({
          name: "order.cancelled",
          callbackId: Nn(),
          data: {
            order: r
          }
        })
      })
    }, [e, t]), null
  },
  Rns = () => {
    const {
      orders: e = []
    } = KLe({
      start: Ue(new Date, "yyyy-MM-dd"),
      end: Ue(new Date, "yyyy-MM-dd"),
      size: 100
    }), t = F8(e);
    return ie(() => {
      const n = k1(t, e, r => r.id, (r, i) => JSON.stringify(r.payments) === JSON.stringify(i.payments));
      n.added.length === 1 && n.added.forEach(r => {
        r.payments.forEach(i => {
          i.state === "APPROVED" || i.state === "COMPLETED" ? Fn.emit({
            name: "payment.paid",
            data: {
              order: r,
              payment: i
            }
          }) : i.state === "CANCELLED" && Fn.emit({
            name: "payment.cancelled",
            callbackId: Nn(),
            data: {
              order: r,
              payment: i
            }
          })
        })
      }), n.edited.forEach(r => {
        const i = t.find(s => s.id === r.id);
        if (i == null) return;
        const o = k1(i.payments, r.payments, s => s.id, (s, u) => s.state === u.state);
        o.added.forEach(s => {
          (s.state === "APPROVED" || s.state === "COMPLETED") && Fn.emit({
            name: "payment.paid",
            data: {
              order: r,
              payment: s
            }
          })
        }), o.edited.forEach(s => {
          s.state === "CANCELLED" && Fn.emit({
            name: "payment.cancelled",
            callbackId: Nn(),
            data: {
              order: r,
              payment: s
            }
          })
        })
      })
    }, [e, t]), null
  };

function ix(e, t = {
  withOrder: !1
}) {
  const {
    data: n
  } = st(U0.tables(t));
  return me(() => e != null ? n.filter(i => i.hallId === e) : n, [n, e])
}
const Mns = () => {
    const e = ix(void 0, {
        withOrder: !0
      }),
      t = F8(e),
      n = K(() => {
        const i = k1(t, e, o => o.id, (o, s) => JSON.stringify(o.order) === JSON.stringify(s.order));
        if (i.edited.length === 1) {
          const o = i.edited[0],
            s = t.find(u => u.id === (o == null ? void 0 : o.id));
          if (o == null || s == null) return !1;
          if (s.order == null && o.order != null) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "order-add",
              order: o.order,
              table: o
            }
          }), !0;
          if (s.order != null && o.order != null) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "order-update",
              order: o.order,
              table: o
            }
          }), !0;
          if (s.order != null && o.order == null) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "clear",
              table: o
            }
          }), !0
        } else if (i.edited.length === 2) {
          const [o, s] = i.edited, u = t.find(b => b.id === (o == null ? void 0 : o.id)), l = t.find(b => b.id === (s == null ? void 0 : s.id));
          if (o == null || s == null || u == null || l == null) return !1;
          if ([u, o, l, s].every(b => b.order != null)) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "swap",
              from: o,
              to: s
            }
          }), !0;
          const c = u.order != null && l.order == null && o.order == null && s.order != null && u.order.id === s.order.id,
            d = u.order == null && l.order != null && o.order != null && s.order == null && l.order.id === o.order.id,
            h = c ? o : s,
            p = c ? s : o;
          if (c || d) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "move",
              from: h,
              to: p
            }
          }), !0;
          const f = u.order != null && l.order != null && (o.order == null || s.order != null),
            g = u.order != null && l.order != null && (o.order != null || s.order == null),
            m = f ? o : s,
            v = f ? s : o;
          if (f || g) return Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "merge",
              from: m,
              to: v
            }
          }), !0
        }
        return !1
      }, [e, t]),
      r = K(() => {
        const i = k1(t, e, o => o.id);
        return i.added.forEach(o => {
          Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "add",
              table: o
            }
          })
        }), i.deleted.forEach(o => {
          Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "delete",
              table: o
            }
          })
        }), i.edited.forEach(o => {
          Fn.emit({
            name: "table.change.event",
            callbackId: Nn(),
            data: {
              event: "update",
              table: o
            }
          })
        }), !0
      }, [e, t]);
    return ie(() => {
      n() || r()
    }, [r, n]), null
  },
  $rr = () => {
    const {
      data: e
    } = st({
      ...FT.list
    });
    return e.length > 0 ? y(Q, {
      children: [a(Ins, {}), a(Pns, {}), a($ns, {}), a(Mns, {}), a(Ons, {}), a(Rns, {})]
    }) : null
  },
  Lns = ["draft-order.clear.request", "draft-order.get.request", "draft-order.add-line-item.request", "draft-order.delete-line-item.request", "draft-order.delete-item-discount.request", "draft-order.delete-discount.request", "draft-order.update-item-quantity.request", "draft-order.update-is-ignore-print.request"],
  Nns = e => Lns.includes(e.name);

function f7t() {
  const {
    openConfirm: e
  } = gn(), t = Hfr();
  return $t(async (n, {
    catalogItem: r,
    onNavigateToDeleteItem: i
  }) => {
    if (Yn(n) && n.errorCode === "MULTI_USE_TICKET_ITEM_DELETE_REQUIRED") {
      ye.log(no.상품_등록_수정_선불권_수정_팝업);
      const o = await e({
        title: n.reason,
        confirmButton: "삭제하러 가기",
        cancelButton: "닫기"
      });
      return ye.log(no.상품_등록_수정_선불권_수정_팝업_버튼_클릭, {
        text: o ? "삭제하러 가기" : "닫기"
      }), o && (i == null || i(), cn.navigateTo("main", "/prepaid-service/multi-use-voucher")), !0
    }
    if (Yn(n) && n.errorCode === "MULTI_USE_TICKET_CREDIT_DELETE_REQUIRED") {
      ye.log(no.상품_등록_수정_선불권_수정_팝업);
      const o = await e({
        title: n.reason,
        confirmButton: "차감하러 가기",
        cancelButton: "닫기"
      });
      return ye.log(no.상품_등록_수정_선불권_수정_팝업_버튼_클릭, {
        text: o ? "차감하러 가기" : "닫기"
      }), o && (r != null ? t({
        catalogItem: r
      }) : cn.navigateTo("main", "settings/point-policy/history")), !0
    }
    return !1
  })
}

function jfr() {
  const e = nh(),
    t = ht(),
    {
      openConfirm: n
    } = gn(),
    {
      openConfirm: r,
      openAlert: i
    } = u9(),
    o = f7t(),
    s = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1
    }).map(u => u.catalogItem);
  return K(async ({
                    menuItem: u,
                    onNavigateToDeleteItem: l,
                    onDelete: c
                  }) => {
    const p = (await mBr()).filter(v => v.productType === "ITEM").filter(v => v.productIds.includes(u.catalogItem.id)),
      f = s.map(v => v.id),
      g = p.map(v => ({
        ...v,
        productIds: v.productIds.map(b => {
          if (f.includes(b)) return b
        }).filter(Boolean)
      }));
    let m;
    if (g.length > 0) {
      const v = g.every(C => C.productIds.length >= 2),
        b = g.map(C => C.title.replaceAll("쿠폰", "").trimEnd()).join(", ");
      v === !0 ? (e.log(Wt.상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업, {
        message: "쿠폰에 적용된 상품이에요."
      }), m = await r({
        title: "쿠폰에 적용된 상품이에요.",
        description: `적용쿠폰: ${b}`,
        cancelButton: {
          text: "닫기",
          onClick: () => {
            e.log(Wt.상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업_버튼_클릭, {
              text: "닫기",
              message: "쿠폰에 적용된 상품이에요."
            })
          }
        },
        confirmButton: {
          type: "danger",
          text: "삭제하기",
          onClick: () => {
            e.log(Wt.상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업_버튼_클릭, {
              text: "삭제하기",
              message: "쿠폰에 적용된 상품이에요."
            })
          }
        }
      })) : (e.log(Wt.상품_등록수정_다이얼로그_쿠폰에_적용된_상품이에요_팝업, {
        message: "쿠폰에 적용된 상품이에요. 상품을 삭제할 수 없어요"
      }), i({
        title: "쿠폰에 적용된 상품이에요. 상품을 삭제할 수 없어요",
        description: `적용쿠폰: ${b}`,
        alertButton: {
          text: "확인"
        }
      }), m = !1)
    } else m = await n({
      title: `"${u.title}" 상품을 삭제할까요?`,
      cancelButton: "취소",
      confirmButton: a(oi.ConfirmButton, {
        type: "danger",
        children: "삭제하기"
      })
    });
    if (!m) throw new Kt("상품 삭제를 취소했어요");
    try {
      await prs(u.catalogItem.id), Rrr((v = []) => v.filter(b => b.id !== u.catalogItem.id)), t.open({
        icon: "icn-success-color",
        message: `"${u.title}" 상품을 삭제했어요.`
      }), c == null || c()
    } catch (v) {
      throw await o(v, {
        catalogItem: u.catalogItem,
        onNavigateToDeleteItem: l
      }) ? new Ate("횟수권에 포함된 상품입니다.") : v
    }
  }, [o, s, e, i, n, r, t])
}
async function CVe(e, t) {
  const n = await Jp.get("businessType"),
    {
      prepaidVoucherPolicy: r
    } = await ove(),
    i = iMn(e, t);
  return await Se.put("/api/pos-orchestrator/v1/items", {
    json: i,
    headers: {
      "toss-pos-business-type": n,
      "toss-pos-feature-type": r.isVoucherEnabled ? "PREPAID_VOUCHER" : void 0
    }
  })
}
async function g7t(e, t) {
  const n = await Jp.get("businessType"),
    r = Ewt(e, t),
    i = B4(r.list, 100);
  for (const o of i) await Se.put("/api/pos/v1/catalog/items/aggregate/bulk", {
    json: {
      list: o,
      headers: {
        "toss-pos-business-type": n
      }
    }
  })
}

function m7t() {
  const e = f7t();
  return K(async ({
                    before: t,
                    after: n,
                    onNavigateToDeleteItem: r
                  }) => {
    try {
      await CVe(t, n), await Db()
    } catch (i) {
      throw await e(i, {
        catalogItem: n,
        onNavigateToDeleteItem: r
      }) ? new Ate("횟수권에 포함된 상품입니다.") : i
    }
  }, [e])
}

function mNs({
               className: e
             }) {
  const {
    register: t
  } = ot();
  return a(ps, {
    feature: "description",
    behaviour: "disable",
    children: a(Ene, {
      maxLength: 800,
      ...t("description"),
      placeholder: "한글설명(800자 이내)",
      className: e
    })
  })
}

function yNs({
               className: e
             }) {
  const {
    control: t
  } = ot();
  return a(Tt, {
    control: t,
    name: "imageUrl",
    render: ({
               field: {
                 value: n,
                 onChange: r
               }
             }) => a(ps, {
      feature: "imageUrl",
      behaviour: "disable",
      children: a(dG, {
        width: 137,
        height: 140,
        imageUrl: n,
        onUpload: r,
        onError: i => {
          const o = "path" in i && typeof i.path == "string" ? i.path : null;
          ye.debug("Compressed_Failed", {
            lastModified: i.lastModified,
            name: i.name,
            path: o,
            size: i.size,
            type: i.type
          })
        },
        onDelete: () => r(null),
        className: e
      })
    })
  })
}

function vNs() {
  const {
    register: e
  } = ot(), t = Qw();
  return a(ps, {
    feature: "kioskTitle",
    behaviour: "disable",
    children: a(Gn, {
      label: a(Gn.Label, {
        required: !0,
        children: `${t.enabledFeatures.join("・")} 용`
      }),
      size: "medium",
      children: y(Gn.Content, {
        variant: "default",
        children: [a(Gn.Item, {
          placeholder: "왼쪽은 14px, 오른쪽은 10px이 맞아요",
          children: a(Lg, {
            placeholder: "상품이름",
            ...e("kioskTitle", {
              required: !0,
              maxLength: {
                value: 255,
                message: "255자 이상 입력할 수 없어요"
              }
            }),
            css: {
              margin: 0,
              padding: 0
            }
          })
        }), a(Gn.ContentSeparator, {}), a(Gn.Item, {
          children: a(Lg, {
            placeholder: "영문이름",
            ...e("titleI18n.languages.en-US", {
              required: !1,
              maxLength: {
                value: 255,
                message: "255자 이상 입력할 수 없어요"
              }
            }),
            css: {
              margin: 0,
              padding: 0
            }
          })
        })]
      })
    })
  })
}

function Gfr({
               autoFocus: e = !1,
               className: t
             }) {
  var l;
  const {
    register: n,
    watch: r,
    setValue: i,
    formState: {
      errors: o
    }
  } = ot(), s = o.title != null && o.title.type === "maxLength", u = r("kioskEnabled");
  return a(Me, {
    label: "상품이름",
    required: !0,
    className: t,
    bottomText: s ? (l = o.title) == null ? void 0 : l.message : null,
    children: a(ps, {
      feature: "kioskTitle",
      behaviour: "disable",
      children: a(Me.TextField, {
        "data-tour-enable-interaction": !0,
        ...n("title", {
          required: !0,
          maxLength: {
            value: 255,
            message: "255자 이상 입력할 수 없어요"
          }
        }),
        error: s,
        autoFocus: e,
        placeholder: "상품이름",
        onChange: c => {
          const d = c.target.value;
          u === !1 && i("kioskTitle", d, {
            shouldDirty: !0,
            shouldValidate: !0
          })
        }
      })
    })
  })
}

function bNs({
               className: e
             }) {
  const {
    register: t
  } = ot();
  return a(ps, {
    feature: "descriptionI18n",
    behaviour: "disable",
    children: a(Ene, {
      maxLength: 800,
      ...t("descriptionI18n.languages.en-US"),
      placeholder: "영어설명을 작성해 주세요.",
      className: e
    })
  })
}

function CNs() {
  const {
    watch: e
  } = ot(), t = e("kioskEnabled") === !0;
  return a(Q, {
    children: t ? y(Q, {
      children: [y(I.Horizontal, {
        gutter: 28,
        children: [y(H, {
          direction: "column",
          align: "stretch",
          css: {
            flex: 1
          },
          children: [a(Gfr, {}), a(vNs, {})]
        }), a(yNs, {
          css: {
            marginTop: 32,
            flex: "none"
          }
        })]
      }), a(ce, {
        size: 10
      }), a(mNs, {}), a(ce, {
        size: 10
      }), a(bNs, {})]
    }) : null
  })
}

function xNs({
               isKioskCatalogItem: e
             }) {
  const t = GA(),
    n = e ? t.filter(s => s.kioskEnabled ?? !1) : t,
    {
      watch: r,
      setValue: i
    } = ot(),
    o = r("options");
  return y("div", {
    children: [a(ne, {
      typography: "p",
      fontWeight: "medium",
      color: _.grey700,
      css: {
        display: "block",
        marginBottom: 12
      },
      children: "상품에 넣을 옵션을 선택하세요"
    }), y(H, {
      as: "ul",
      css: [Bc, {
        flexWrap: "wrap",
        margin: -7
      }],
      children: [n.map(s => {
        const u = o.some(c => c.id === s.id);
        return a("li", {
          css: {
            padding: 7
          },
          children: a(ps, {
            feature: "options",
            behaviour: "disable",
            children: a(wNs, {
              selected: u,
              onClick: () => {
                u ? (i("options", o.filter(c => c.id !== s.id)), ye.log(Wt.상품_등록수정_상품에넣을옵션_클릭, {
                  optionId: s.id,
                  optionTitle: s.title,
                  value: "n"
                })) : (i("options", [...o, {
                  ...s,
                  isRequired: s.minChoices > 0
                }]), ye.log(Wt.상품_등록수정_상품에넣을옵션_클릭, {
                  optionId: s.id,
                  optionTitle: s.title,
                  value: "y"
                }))
              },
              children: s.title
            })
          })
        }, s.id)
      }), a("li", {
        css: {
          padding: 7
        },
        children: a(ps, {
          feature: "options",
          behaviour: "disable",
          children: a(_Ns, {})
        })
      }, "add-option")]
    })]
  })
}

function wNs({
               selected: e,
               disabled: t = !1,
               onClick: n,
               children: r
             }) {
  return a(l0, {
    disabled: t,
    theme: e ? "blue" : "grey",
    "aria-selected": e,
    css: Ft,
    onClick: n,
    children: r
  })
}

function _Ns({
               disabled: e = !1
             }) {
  const t = lVe(),
    n = ht(),
    r = async () => {
      await t({
        mode: "create"
      }), n.open({
        icon: "icn-success-color",
        message: "새로운 옵션이 등록되었어요.",
        position: "top"
      })
    };
  return a(W, {
    click: {
      schemaId: Wt.상품_등록수정_새옵션추가_버튼_클릭
    },
    children: a(l0, {
      variant: "placeholder",
      disabled: e,
      css: Ft,
      onClick: r,
      children: " 새옵션 추가"
    })
  })
}

function ANs({
               referrer: e
             }) {
  const t = de(null),
    {
      control: n,
      watch: r,
      setValue: i
    } = ot(),
    o = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1
    }),
    {
      openAlert: s
    } = gn(),
    u = ENs(o),
    l = r("id");
  uCe({
    onScan: d => {
      var p;
      ye.log(Wt.바코드_스캔, {
        barcode: d,
        referrer: e
      });
      const h = o.find(f => Number(f.price.barcode) === Number(d));
      if (h != null && h.catalogItem.id !== l) {
        s({
          title: "이미 등록된 바코드예요",
          description: `방금 스캔한 바코드는 ${h.title} 상품에 등록되어 있어서 중복으로 등록할 수 없어요.`,
          onEntered: () => {
            ye.log(Wt.상품_등록_수정_이미_등록된_바코드에요_팝업)
          },
          alertButton: a(O0.AlertButton, {
            onClick: () => {
              ye.log(Wt.상품_등록_수정_이미_등록된_바코드에요_팝업_확인_클릭)
            },
            children: "확인"
          })
        });
        return
      }(p = t.current) == null || p.scrollIntoView({
        behavior: "smooth"
      }), i("prices.0.barcode", d, {
        shouldDirty: !0,
        shouldValidate: !0
      })
    },
    blockOthers: !0
  });
  const c = () => {
    const d = u();
    i("prices.0.barcode", d, {
      shouldDirty: !0,
      shouldValidate: !0
    })
  };
  return a(ps, {
    feature: "barcode",
    behaviour: "disable",
    children: a(Tt, {
      control: n,
      name: "prices.0.barcode",
      rules: {
        required: !1,
        validate: d => {
          if (d != null && d.length > 85) return "85자 이내로 입력해 주세요";
          const h = o.find(p => p.price.barcode === d);
          return Gt(d) === !1 && h != null && h.catalogItem.id !== l ? "이미 등록된 바코드 번호예요" : !0
        }
      },
      render: ({
                 field: {
                   value: d,
                   onChange: h,
                   disabled: p
                 },
                 fieldState: {
                   error: f
                 }
               }) => a(zn, {
        ref: g => {
          g == null || g.classList.add("barcode-input")
        },
        disabled: p,
        error: f != null,
        bottomText: f == null ? void 0 : f.message,
        placeholder: "바코드 스캐너로 바코드를 스캔하거나 직접 입력해 주세요",
        label: a(zn.Label, {
          children: "바코드"
        }),
        rightAddon: a(W, {
          click: {
            schemaId: Wt.상품_등록_수정_다이얼로그_바코드_자동생성_클릭
          },
          params: {
            itemId: l !== -1 ? l : void 0
          },
          children: a(rn, {
            disabled: p,
            size: "small",
            variant: "weak",
            theme: "blue",
            leftAddon: a(rn.Icon, {
              name: "icon-barcode-scan-mono"
            }),
            onClick: c,
            children: "자동생성"
          })
        }),
        value: d ?? "",
        onChange: g => h(g.target.value.replace(/\W/g, "")),
        onFocus: g => {
          setTimeout(() => {
            g.target.select()
          }, 100)
        }
      })
    })
  })
}

function ENs(e) {
  return $t(() => {
    const t = e.filter(r => {
      var i;
      return ((i = r.catalogItem.prices[0]) == null ? void 0 : i.barcode) != null
    }).map(r => Number(r.catalogItem.prices[0].barcode)).filter(r => r > 0).sort((r, i) => r > i ? 1 : -1);
    let n = 1;
    for (const r of t)
      if (r === n) n++;
      else return `${n}`.padStart(16, "0");
    return `${n}`.padStart(16, "0")
  })
}

function DNs({
               className: e
             }) {
  const {
    control: t,
    setValue: n,
    getValues: r
  } = ot(), i = Ra({
    withFavorite: !1,
    withPrepaidVoucher: !1
  }), o = p0(), s = u => {
    const l = r("position"),
      c = l === -1,
      d = i.filter(h => h.category.id === u.id).some(h => h.position === l);
    (c || d) && n("position", KSo(i, u.id))
  };
  return a(Me, {
    label: "카테고리 선택",
    required: !0,
    className: e,
    children: a(Tt, {
      name: "category",
      control: t,
      rules: {
        required: !0
      },
      render: ({
                 field: {
                   value: u,
                   onChange: l
                 }
               }) => {
        const c = d => {
          const h = o.find(p => p.id === d);
          Ht(h != null), l(h), s(h)
        };
        return a(ps, {
          feature: "category",
          behaviour: "disable",
          children: y(H, {
            as: "ul",
            css: [Bc, {
              flexWrap: "wrap",
              margin: -7
            }],
            children: [o.map(d => {
              const h = d.id === (u == null ? void 0 : u.id);
              return a("li", {
                css: {
                  padding: 7
                },
                children: a(ps, {
                  feature: "options",
                  behaviour: "disable",
                  children: a(TNs, {
                    selected: h,
                    onClick: () => c(d.id),
                    children: d.title
                  })
                })
              }, d.id)
            }), a("li", {
              css: {
                padding: 7
              },
              children: a(ps, {
                feature: "options",
                behaviour: "disable",
                children: a(BNs, {})
              })
            }, "add-option")]
          })
        })
      }
    })
  })
}

function TNs({
               selected: e,
               disabled: t = !1,
               onClick: n,
               children: r
             }) {
  return a(l0, {
    "data-tour-enable-interaction": !0,
    disabled: t,
    theme: e ? "blue" : "grey",
    "aria-selected": e,
    css: Ft,
    onClick: n,
    children: r
  })
}

function BNs({
               disabled: e = !1
             }) {
  const t = gxe(),
    n = async () => {
      await t()
    };
  return a(W, {
    click: {
      schemaId: Wt.상품_등록_수정_다이얼로그_카테고리_추가하기_클릭
    },
    children: a(l0, {
      variant: "placeholder",
      disabled: e,
      css: Ft,
      onClick: n,
      children: " 새 카테고리 등록"
    })
  })
}

function Dre({
               label: e,
               description: t,
               children: n,
               className: r
             }) {
  return y(H, {
    align: "center",
    justify: "space-between",
    css: {
      padding: "12px 0"
    },
    className: r,
    children: [y(I.Horizontal, {
      align: "center",
      gutter: 12,
      children: [a(ne, {
        typography: "h7",
        color: _.grey800,
        fontWeight: "semibold",
        style: {
          textAlign: "left"
        },
        children: e
      }), t != null ? a(ne, {
        color: _.grey600,
        fontWeight: "medium",
        children: t
      }) : null]
    }), n]
  })
}

function SNs(e) {
  switch (e) {
    case "신규":
      return {
        title: "신규", color: _.teal700
      };
    case "인기":
      return {
        title: "인기", color: _.blue700
      }
  }
}
const kNs = [{
  name: "인기",
  value: "인기"
}, {
  name: "신규",
  value: "신규"
}];

function FNs({
               className: e
             }) {
  const {
    control: t
  } = ot(), n = Qw();
  return a(Dre, {
    label: `${n.enabledFeatures.join("・")} 태그`,
    className: e,
    children: a(Tt, {
      name: "labels",
      control: t,
      render: ({
                 field: {
                   value: r,
                   onChange: i
                 }
               }) => {
        var s;
        const o = (s = r[0]) == null ? void 0 : s.title;
        return y(I.Horizontal, {
          gutter: 8,
          align: "center",
          children: [a(ps, {
            feature: "labels",
            behaviour: "disable",
            children: a(ta, {
              label: "없음",
              inline: !0,
              checked: o === void 0,
              onChange: () => i([])
            })
          }), kNs.map(({
                         name: u,
                         value: l
                       }) => a(ps, {
            feature: "labels",
            behaviour: "disable",
            children: a(ta, {
              label: u,
              inline: !0,
              checked: o === l,
              onChange: () => i([SNs(l)])
            })
          }, l))]
        })
      }
    })
  })
}
const $Ns = E7.limit({
  key: "catalog/modify-dialog/customer-visibility-switch/tooltip",
  maxCount: fi() === "live" ? 1 : 10
});

function INs({
               className: e
             }) {
  const {
    enabledFeatures: t
  } = Qw(), {
    control: n,
    watch: r
  } = ot(), i = r("prices.0.priceType"), o = r("kioskEnabled"), s = i === "VARIABLE" || i === "UNIT", [u, l] = q(() => o !== !0 ? !1 : $Ns.shouldShow());
  return a(Dre, {
    label: y(H.Center, {
      css: {
        gap: 6
      },
      children: [a("span", {
        children: "고객용 채널 노출"
      }), a(kc, {
        message: `${[...t,"매장페이지"].join("・")}
에 보여져요`,
        messageAlign: "center",
        placement: "top",
        size: "medium",
        clipToEnd: "none",
        motionVariant: "weak",
        openOnHover: !0,
        autoFlip: !0,
        css: {
          zIndex: Lf.Content + 1,
          whiteSpace: "pre-wrap"
        },
        children: a(rt, {
          frameShape: gt.CleanW20,
          backgroundColor: "transparent",
          name: "icon-question-circle-mono",
          color: _.grey300,
          "aria-hidden": !0
        })
      })]
    }),
    css: {
      padding: 0
    },
    className: e,
    children: a(Tt, {
      name: "kioskEnabled",
      control: n,
      render: ({
                 field: {
                   value: c,
                   onChange: d
                 }
               }) => a(kc, {
        message: "노출여부를 확인해 주세요",
        messageAlign: "left",
        placement: "bottom",
        size: "small",
        motionVariant: "strong",
        defaultOpen: c,
        anchorPositionByRatio: .87,
        offset: 4,
        open: u,
        dismissible: !0,
        onOpenChange: h => {
          h || l(!1)
        },
        css: {
          zIndex: 999999
        },
        children: a("div", {
          children: a(Ni, {
            capture: "onChange",
            schemaId: Wt.상품_등록수정_키오스크_노출_토글,
            params: h => ({
              exposeYn: h.target.checked
            }),
            children: a(ps, {
              feature: "kioskEnabled",
              behaviour: "disable",
              children: a(ts, {
                checked: c,
                onChange: h => {
                  const p = h.target.checked;
                  d(p), u && !p && l(!1)
                },
                disabled: s,
                css: {
                  position: "relative"
                }
              })
            })
          })
        })
      })
    })
  })
}
const xVe = {
  reasons: e => {
    const t = ["reasons"];
    return e != null && t.push(e), t
  },
  historyList: e => {
    const t = ["inventory", "histories", e.targetId];
    return e != null && t.push({
      payload: e
    }), t
  },
  history: e => ["inventory", "histories", e]
};

function xon() {
  return yt.invalidateQueries({
    queryKey: xVe.reasons()
  })
}
async function PNs(e) {
  return Se.post("/api/pos/v1/catalog/inventory/change/reason", {
    json: e
  })
}
async function ONs(e) {
  return Se.delete(`/api/pos/v1/catalog/inventory/change/reason/${e}`)
}
async function RNs({
                     withUsed: e
                   }) {
  const {
    reasons: t
  } = await Se.get("/api/pos/v1/catalog/inventory/change/reason", {
    searchParams: Mf.create({
      withUsed: e
    })
  });
  return t
}

function y7t({
               type: e,
               withUsed: t
             } = {}) {
  const {
    data: n
  } = st({
    queryKey: xVe.reasons(t),
    queryFn: () => RNs({
      withUsed: t
    })
  });
  return {
    data: me(() => e == null ? n : n.filter(i => i.type === e), [n, e])
  }
}
const qfr = [$e, wt({
  top: 20,
  bottom: 20
}), {
  border: `0 solid ${_.grey100}`,
  borderBottomWidth: 1
}];

function MNs() {
  const {
    open: e
  } = sn();
  return K(t => new Promise(n => {
    e(({
         isOpen: r,
         close: i
       }) => a(Oe, {
      fallback: null,
      children: a(LNs, {
        open: r,
        onClose: () => {
          n(), i()
        },
        ...t
      })
    }))
  }), [e])
}

function LNs({
               inventoryType: e,
               referrer: t,
               open: n,
               onClose: r
             }) {
  const i = ht(),
    {
      openConfirm: o
    } = gn(),
    {
      data: s
    } = y7t({
      type: e
    }),
    [u, l] = q(""),
    {
      mutate: c,
      isPending: d
    } = lt({
      mutationFn: async () => {
        await PNs({
          reason: u,
          type: e
        })
      },
      onSuccess: () => {
        const C = te(e).with("IN", () => "수량 추가 사유를 추가했어요").with("OUT", () => "수량 차감 사유를 추가했어요").exhaustive();
        i.open({
          message: C,
          icon: "icn-success-color"
        }), xon(), l("")
      },
      onError: C => {
        if (Yn(C) && C.errorCode === "40020") {
          f();
          return
        }
        i.open({
          message: "사유 생성에 실패했어요",
          icon: "icon-warning-circle"
        })
      }
    }),
    {
      mutate: h,
      isPending: p
    } = lt({
      mutationFn: async C => {
        await ONs(C)
      },
      onSuccess: () => {
        const C = te(e).with("IN", () => "수량 추가 사유를 삭제했어요").with("OUT", () => "수량 차감 사유를 삭제했어요").exhaustive();
        i.open({
          message: C,
          icon: "icn-success-color"
        }), xon()
      },
      onError: () => {
        i.open({
          message: "사유 삭제에 실패했어요",
          icon: "icon-warning-circle"
        })
      }
    }),
    f = () => {
      i.open({
        message: "중복된 사유는 생성할 수 없어요",
        icon: "icon-warning-circle"
      })
    },
    g = async () => {
      if (s.find(x => x.reason === u) != null) {
        f();
        return
      }
      ye.log(Wt.재고_관리_수량_더하기_빼기_사유_저장_클릭, {
        quantityType: e,
        text: u
      }), c()
    }, m = async C => {
      await o({
        title: "사유를 삭제할까요?",
        cancelButton: "취소",
        confirmButton: "확인"
      }) && h(C)
    }, v = d || p, b = u.length === 0 || p;
  return a(W, {
    screen: {
      schemaId: Wt.재고_관리_수량_더하기_빼기_사유,
      params: {
        quantityType: e,
        referrer: t
      }
    },
    children: y(xe, {
      css: {
        width: 611,
        height: 684
      },
      onClose: r,
      open: n,
      children: [a(xe.CloseButton, {
        onClick: r
      }), y("form", {
        css: {
          padding: "50px 20px 50px 50px"
        },
        onSubmit: C => {
          C.preventDefault(), 0 < u.length && g()
        },
        children: [a(H, {
          align: "flex-end",
          children: a(xe.Title, {
            children: a(ne, {
              typography: "h6",
              fontWeight: "semibold",
              color: _.grey800,
              children: a(F1, {
                value: e,
                caseBy: {
                  IN: a(Q, {
                    children: "수량 추가 사유"
                  }),
                  OUT: a(Q, {
                    children: "수량 차감 사유"
                  })
                }
              })
            })
          })
        }), a(ce, {
          size: 12
        }), y(xe.Scrollable, {
          css: {
            maxHeight: 530
          },
          children: [y(I.Horizontal, {
            gutter: 12,
            justify: "space-between",
            align: "center",
            css: [...qfr, {
              borderTopWidth: 1
            }],
            children: [a(Me, {
              css: $e,
              children: a(Me.TextField, {
                value: u,
                onChange: C => l(C.target.value),
                placeholder: "직접등록할 수 있어요",
                maxLength: 20
              })
            }), a(Ye, {
              variant: "weak",
              type: "primary",
              size: "large",
              display: "block",
              css: {
                width: 120
              },
              onClick: g,
              disabled: b,
              loading: d,
              children: "저장"
            })]
          }), a(H, {
            direction: "column",
            children: s.map(C => a(NNs, {
              title: C.reason,
              inventoryType: e,
              disabled: v,
              onClick: () => m(C.id)
            }, C.id))
          })]
        })]
      })]
    })
  })
}

function NNs({
               title: e,
               inventoryType: t,
               onClick: n,
               disabled: r = !1
             }) {
  return y(H, {
    direction: "row",
    justify: "space-between",
    align: "center",
    css: qfr,
    children: [a(ne, {
      typography: "h6",
      color: _.grey800,
      fontWeight: "semibold",
      children: e
    }), a(W, {
      click: {
        schemaId: Wt.재고_관리_수량_더하기_빼기_사유_삭제_클릭,
        params: {
          quantityType: t,
          reason: e
        }
      },
      children: a(Ye, {
        variant: "weak",
        size: "large",
        display: "block",
        css: {
          width: 100
        },
        disabled: r,
        onClick: n,
        children: "삭제"
      })
    })]
  })
}
const VNs = 50;

function zNs({
               id: e = -1,
               inventoryType: t
             }) {
  const {
    value: n,
    setValue: r
  } = Ri("inventory", "previousQuantity"), i = me(() => n ?? [], [n]), o = K(async s => {
    const u = mn(i, l => {
      const c = won(l, e),
        d = od([s, ...c[t]]).slice(0, 3);
      c[t] = d, WNs(l, e), l.unshift(c), l.splice(VNs)
    });
    await r(u)
  }, [e, t, r, i]);
  return {
    previousQuantity: won(i, e)[t],
    addPreviousQuantity: o
  }
}

function won(e, t) {
  return e.find(n => n.id === t) ?? {
    id: t,
    IN: [],
    OUT: []
  }
}

function WNs(e, t) {
  const n = e.findIndex(r => r.id === t);
  n > -1 && e.splice(n, 1)
}

function v7t() {
  const {
    open: e
  } = sn();
  return K(t => new Promise((n, r) => {
    e(({
         isOpen: i,
         close: o
       }) => a(Oe, {
      fallback: null,
      children: a(UNs, {
        ...t,
        open: i,
        onClose: () => {
          r(new Kt), o()
        },
        onConfirm: s => {
          n(s), o()
        }
      })
    }))
  }), [e])
}

function UNs({
               priceId: e,
               initialQuantity: t = 0,
               open: n,
               onClose: r,
               onConfirm: i,
               menuItem: o,
               referrer: s
             }) {
  var E, T;
  const [u, l] = q("IN"), [c, d] = q(0), h = {
    itemId: o == null ? void 0 : o.catalogItem.id,
    itemTitle: o == null ? void 0 : o.title,
    categoryId: (E = o == null ? void 0 : o.category) == null ? void 0 : E.id,
    categoryTitle: (T = o == null ? void 0 : o.category) == null ? void 0 : T.title,
    referrer: s
  }, p = MNs(), {
    data: f
  } = y7t({
    type: u
  }), {
    previousQuantity: g,
    addPreviousQuantity: m
  } = zNs({
    id: e,
    inventoryType: u
  }), [v, b] = q(), C = () => xQe(u) * c, x = () => {
    if (c === 0) return `현재 수량 : ${t}`;
    const B = xQe(u);
    return `현재 수량 : ${t}, 변경될 수량 : ${t}${u==="IN"?"+":"-"}${c}=${t+B*c}개`
  }, w = c === 0, A = async () => {
    await m(c);
    const B = xQe(u);
    i({
      reason: v,
      quantity: B * c
    })
  };
  return y(xe, {
    css: {
      width: 754,
      height: 615,
      padding: "40px 50px 50px"
    },
    onClose: r,
    open: n,
    children: [a(HNs, {
      inventoryType: u,
      previousQuantity: g,
      logParams: {
        ...h
      },
      type: e == null ? "create" : "edit"
    }), a(Ln, {
      size: "large",
      value: u,
      onValueChange: B => l(B),
      children: y(Ln.List, {
        css: {
          width: "fit-content"
        },
        children: [a(W, {
          click: {
            schemaId: Wt.재고_관리_수량_더하기_빼기_수량_설정_클릭,
            params: {
              ...h,
              text: Pt
            }
          },
          children: a(Ln.Item, {
            value: "IN",
            css: wt.x(40),
            children: "수량 더하기"
          })
        }), a(W, {
          click: {
            schemaId: Wt.재고_관리_수량_더하기_빼기_수량_설정_클릭,
            params: {
              ...h,
              text: Pt
            }
          },
          children: a(Ln.Item, {
            value: "OUT",
            css: wt.x(40),
            children: "수량 빼기"
          })
        })]
      })
    }), a(ce, {
      size: 40
    }), y("div", {
      css: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        columnGap: 52,
        width: "100%"
      },
      children: [y(I.Vertical, {
        gutter: 0,
        align: "stretch",
        children: [a(xe.Title, {
          children: a(ne, {
            typography: "h5",
            color: _.grey800,
            fontWeight: "semibold",
            children: a(F1, {
              value: u,
              caseBy: {
                IN: a(Q, {
                  children: "몇 개를 더할까요?"
                }),
                OUT: a(Q, {
                  children: "몇 개를 뺄까요?"
                })
              }
            })
          })
        }), a("div", {
          css: {
            marginLeft: -24
          },
          children: a(Io.Clearable, {
            autoFocus: Un.isElectron,
            type: "tel",
            variant: "line",
            labelOption: "sustain",
            placeholder: "0개",
            value: C(),
            help: x(),
            onChange: B => {
              const S = B.target.value;
              if (S === "-") {
                d(0);
                return
              }
              const F = Math.abs(Number(S));
              Number.isNaN(F) || d(F)
            },
            maxLength: u === "IN" ? 6 : 7
          })
        }), a(ce, {
          size: 26
        }), y(H, {
          direction: "column",
          children: [y(ne, {
            color: _.grey700,
            fontWeight: "medium",
            children: ["수량 ", u === "IN" ? "추가" : "차감", " 사유를 선택하세요"]
          }), a(ce, {
            size: 12
          }), a(GNs, {
            inventoryReasons: f,
            selectedReason: v,
            onReasonClick: B => b(B),
            onAddReasonClick: () => p({
              inventoryType: u,
              referrer: h.referrer
            }),
            logParams: h
          })]
        })]
      }), y(I.Vertical, {
        gutter: 28,
        children: [a(Wa, {
          addonKey: "00",
          options: {
            maxLength: 6
          },
          css: {
            width: 280,
            height: 242
          },
          value: String(c),
          onChange: B => {
            const S = Number(B);
            isNaN(S) || d(S)
          }
        }), a("div", {
          css: wt.x24,
          children: a(jNs, {
            quantities: g,
            onQuantityClick: B => d(S => S + B),
            inventoryType: u,
            logParams: h
          })
        })]
      })]
    }), y(H, {
      direction: "row",
      justify: "space-between",
      css: [$e, {
        marginTop: "auto"
      }],
      children: [a(W, {
        click: {
          schemaId: Wt.재고_관리_수량_더하기_빼기_취소_클릭,
          params: {
            ...h
          }
        },
        children: a(Ye, {
          size: "xlarge",
          onClick: r,
          children: "취소"
        })
      }), a(W, {
        click: {
          schemaId: Wt.재고_관리_수량_더하기_빼기_CTA_클릭,
          params: {
            ...h,
            quantityType: u,
            quantityChange: Math.abs(c),
            totalQuantity: t + c,
            reason: (v == null ? void 0 : v.reason) != null ? v.reason : null
          }
        },
        children: a(Ye, {
          type: "primary",
          size: "xlarge",
          disabled: w,
          css: {
            width: 160
          },
          onClick: A,
          children: a(F1, {
            value: u,
            caseBy: {
              IN: a(Q, {
                children: "수량 더하기"
              }),
              OUT: a(Q, {
                children: "수량 빼기"
              })
            }
          })
        })
      })]
    })]
  })
}

function HNs({
               inventoryType: e,
               previousQuantity: t,
               logParams: n,
               type: r
             }) {
  const i = RMe(n);
  return ie(() => {
    ye.log(Wt.재고_관리_수량_더하기_빼기, {
      ...i,
      shortcutList: t,
      quantityType: e,
      type: r
    })
  }, [e, t, i, r]), a(Q, {})
}

function jNs({
               quantities: e,
               onQuantityClick: t,
               inventoryType: n,
               logParams: r
             }) {
  const i = ro();
  return a(Wb, {
    scrollable: i,
    css: {
      maxHeight: 100
    },
    children: a(H, {
      css: {
        flexWrap: "wrap",
        gap: 10
      },
      children: e.map((o, s) => a(W, {
        click: {
          schemaId: Wt.재고_관리_수량_더하기_빼기_단축키_클릭,
          params: {
            ...r,
            quantityType: n,
            text: `${o}개`,
            position: s + 1
          }
        },
        children: y(gd, {
          css: {
            cursor: "pointer"
          },
          onClick: () => t(o),
          children: [n === "IN" ? "" : "-", o, "개"]
        })
      }, s))
    })
  })
}

function GNs({
               inventoryReasons: e,
               selectedReason: t,
               onReasonClick: n,
               onAddReasonClick: r,
               logParams: i
             }) {
  const o = ro();
  return a(Wb, {
    scrollable: o,
    css: {
      height: 140,
      maxHeight: 140
    },
    children: y(H, {
      css: {
        flexWrap: "wrap",
        gap: 10
      },
      children: [e.map(s => {
        const u = (t == null ? void 0 : t.id) === s.id;
        return a(W, {
          click: {
            schemaId: Wt.재고_관리_수량_더하기_빼기_사유_클릭,
            params: {
              ...i,
              text: s.reason
            }
          },
          children: a(gd, {
            theme: u ? "blue" : "grey",
            rightAddon: u ? a(gd.Icon, {
              name: "icon-check-mono-fill"
            }) : a(gd.Icon, {
              name: "icon-circle-empty-mono"
            }),
            css: {
              cursor: "pointer"
            },
            onClick: () => n == null ? void 0 : n(s),
            children: s.reason
          })
        }, s.id)
      }), a(W, {
        click: {
          schemaId: Wt.재고_관리_수량_더하기_빼기_사유_클릭,
          params: {
            ...i,
            text: "직접등록"
          }
        },
        children: a(gd, {
          variant: "placeholder",
          css: {
            cursor: "pointer"
          },
          onClick: r,
          children: " 직접등록"
        })
      })]
    })
  })
}

function xQe(e) {
  return e === "IN" ? 1 : -1
}
async function Yfr(e) {
  const {
    result: t
  } = await Se.get("/api/pos/v1/catalog/inventory", {
    searchParams: {
      ...e
    }
  });
  return t
}

function qNs({
               mode: e,
               className: t
             }) {
  var v;
  const [n, r] = q(0), {
    watch: i,
    control: o,
    setValue: s,
    formState: u
  } = ot(), l = v7t(), c = i(), d = i("prices.0.draftInventory.isStockable"), h = i("prices.0.draftInventory.quantity"), p = i(), f = ((v = p.prices[0]) == null ? void 0 : v.isStockable) === !0;
  ie(() => {
    var b, C, x;
    ((x = (C = (b = u.dirtyFields.prices) == null ? void 0 : b[0]) == null ? void 0 : C.draftInventory) == null ? void 0 : x.quantity) === !0 && s("state", d && h <= 0 ? "SOLD_OUT" : "ON_SALE", {
      shouldDirty: !0,
      shouldValidate: !0
    })
  }, [s, h, d, u.dirtyFields.prices]);
  const g = async b => {
    const C = await l({
      priceId: i("prices.0.id"),
      initialQuantity: b,
      menuItem: e === "edit" ? RRe(p) : void 0,
      referrer: c.id === -1 ? "상품 등록" : "상품 편집"
    });
    f ? s("prices.0.draftInventory", {
      reason: C.reason,
      quantity: b + C.quantity,
      isStockable: !0
    }, {
      shouldDirty: !0,
      shouldValidate: !0
    }) : (r(b), s("prices.0.draftInventory", {
      reason: C.reason,
      quantity: C.quantity,
      isStockable: !0
    }, {
      shouldDirty: !0,
      shouldValidate: !0
    }))
  }, m = de(null);
  return y(H, {
    direction: "column",
    className: t,
    children: [a(Dre, {
      label: "재고 관리",
      css: $e,
      children: a(Tt, {
        name: "prices.0.draftInventory.isStockable",
        control: o,
        render: ({
                   field: {
                     value: b,
                     onChange: C
                   }
                 }) => a(Ni, {
          capture: "onChange",
          schemaId: Wt.상품_등록_수정_재고_관리_클릭,
          params: x => ({
            activeYn: !x.target.checked
          }),
          children: a(ts, {
            checked: b,
            onChange: async x => {
              var w;
              if (x.target.checked === !0) {
                const A = ((w = c.prices[0]) == null ? void 0 : w.id) ?? -1;
                if (A < 0) {
                  g(h);
                  return
                }
                const E = await Yfr({
                  targetType: "ITEM_PRICE",
                  targetId: A
                });
                E != null ? g(E.quantity) : g(h)
              }
              C(x.target.checked)
            }
          })
        })
      })
    }), d ? y(Q, {
      children: [a(W, {
        click: {
          schemaId: Wt.상품_등록_수정_재고_관리_수량_클릭,
          params: {
            stockQuantity: n + h
          }
        },
        children: a(Me, {
          label: "현재 수량",
          required: !0,
          css: $e,
          children: a(Me.TextField, {
            ref: m,
            value: String(n + h),
            rightAddon: a(Me.Txt, {
              color: _.grey700,
              children: "개"
            }),
            inputMode: "none",
            onClick: () => {
              var b;
              (Un.isIos || Un.isAndroid) && ((b = m.current) == null || b.blur()), g(h)
            },
            maxLength: 15,
            onChange: () => {}
          })
        })
      }), a(ce, {
        size: 16
      })]
    }) : null]
  })
}
const Kfr = 9999999;

function YNs({
               className: e
             }) {
  const {
    control: t,
    watch: n
  } = ot(), r = n("prices.0.priceType"), i = r === "VARIABLE";
  return r === "UNIT" ? a(Dt, {
    size: "medium",
    required: !0,
    label: a(Dt.Label, {
      children: "기본가격"
    }),
    children: y(Dt.Content, {
      children: [a(Tt, {
        control: t,
        name: "prices.0.priceUnit",
        rules: {
          required: !0
        },
        render: ({
                   field: {
                     onChange: o,
                     value: s
                   }
                 }) => a(Dt.Item, {
          rightAddon: a(Dt.Txt, {
            color: M.grey700,
            children: "g"
          }),
          style: {
            flex: "4"
          },
          children: a(ps, {
            feature: "prices.0.priceUnit",
            behaviour: "disable",
            children: a(zn, {
              placeholder: "0",
              value: fe(s),
              onChange: u => {
                const c = Number(ga(u.target.value));
                o(Math.min(c, 99999))
              }
            })
          })
        })
      }), a(Dt.ContentSeparator, {}), a(Tt, {
        control: t,
        name: "prices.0.priceValue",
        rules: {
          required: !0
        },
        render: ({
                   field: {
                     onChange: o,
                     value: s
                   }
                 }) => a(Dt.Item, {
          rightAddon: a(Dt.Txt, {
            color: M.grey700,
            children: "원"
          }),
          style: {
            flex: "6"
          },
          children: a(ps, {
            feature: "prices.0.priceValue",
            behaviour: "disable",
            children: a(zn, {
              placeholder: "0",
              value: fe(s),
              onChange: u => {
                const l = Number(ga(u.target.value));
                o(Math.min(l, Kfr))
              }
            })
          })
        })
      })]
    })
  }) : a(Me, {
    label: "기본가격",
    required: !0,
    className: e,
    children: a(Tt, {
      control: t,
      name: "prices.0.priceValue",
      rules: {
        required: !0
      },
      render: ({
                 field: {
                   onChange: o,
                   value: s
                 }
               }) => a(ps, {
        feature: "prices.0.priceValue",
        behaviour: "disable",
        children: a(YNe, {
          "data-tour-enable-interaction": !0,
          value: s,
          onChange: o,
          showPriceWhenDisabled: !i,
          disabled: i
        })
      })
    })
  })
}

function KNs() {
  const {
    control: e
  } = ot();
  return a(ps, {
    feature: "provenance",
    behaviour: "disable",
    children: a(Tt, {
      control: e,
      name: "provenance.displayProvenance",
      render: ({
                 field: {
                   value: t,
                   onChange: n,
                   disabled: r
                 },
                 fieldState: {
                   error: i
                 }
               }) => a(zn, {
        disabled: r,
        error: i != null,
        bottomText: i == null ? void 0 : i.message,
        placeholder: "제조사",
        label: a(zn.Label, {
          children: "제조사"
        }),
        value: t,
        onChange: n
      })
    })
  })
}
const XNs = L0(25),
  QNs = L0(6).map(e => e * 10);

function ZNs() {
  const {
    control: e,
    watch: t,
    setValue: n
  } = ot(), r = t("durationMinutes"), [i, o] = q(r != null && r > 0);
  return jC(() => {
    n("durationMinutes", i ? 60 : null)
  }, [i, n]), y(Q, {
    children: [a(Dre, {
      label: "서비스 소요 시간",
      description: "고객에게 예약 가능한 시간으로 보여요",
      children: a(ts, {
        checked: i,
        onChange: s => o(s.target.checked)
      })
    }), i ? a(I.Horizontal, {
      css: {
        marginBottom: 16,
        position: "relative",
        overflow: "hidden"
      },
      children: a(Tt, {
        name: "durationMinutes",
        control: e,
        render: ({
                   field: {
                     value: s,
                     onChange: u
                   }
                 }) => a(JNs, {
          value: s ?? 0,
          onChange: u
        })
      })
    }) : null]
  })
}

function JNs({
               value: e,
               onChange: t
             }) {
  const n = Math.floor(e / 60),
    r = e % 60;
  return y(I.Horizontal, {
    css: {
      width: "100%"
    },
    gutter: 16,
    children: [y(Mp, {
      size: "medium",
      value: `${n}`,
      onValueChange: i => {
        const o = te(Number(i)).with(24, () => 0).when(s => s === 0 && r === 0, () => 10).otherwise(() => r);
        t(Number(i) * 60 + o)
      },
      children: [y(Mp.FieldBoxTrigger, {
        children: [Math.floor(e / 60), "시간"]
      }), a(Mp.Content, {
        css: {
          zIndex: Lf.Content
        },
        children: XNs.map(i => y(Mp.Option, {
          value: `${i}`,
          children: [i, "시간"]
        }, i))
      })]
    }), y(Mp, {
      size: "medium",
      disabled: n === 24,
      value: `${r}`,
      onValueChange: i => {
        t(n * 60 + Number(i))
      },
      children: [y(Mp.FieldBoxTrigger, {
        children: [e % 60, "분"]
      }), a(Mp.Content, {
        css: {
          zIndex: Lf.Content
        },
        children: QNs.map(i => y(Mp.Option, {
          disabled: n === 0 && i === 0,
          value: `${i}`,
          children: [i === 0 ? "00" : i, "분"]
        }, i))
      })]
    })]
  })
}

function eVs({
               className: e
             }) {
  const {
    control: t,
    watch: n,
    setValue: r
  } = ot(), i = n("prices.0.draftInventory.isStockable"), o = n("prices.0.draftInventory.quantity"), s = ht(), u = i && o <= 0;
  return ie(() => {
    i && o <= 0 && r("state", "SOLD_OUT")
  }, [o, i, r]), a(Dre, {
    label: a(Q, {
      children: "품절 표시"
    }),
    className: e,
    children: a(Tt, {
      name: "state",
      control: t,
      render: ({
                 field: {
                   value: l,
                   onChange: c
                 }
               }) => {
        const d = l === "SOLD_OUT";
        return a(Ni, {
          capture: "onChange",
          schemaId: Wt.상품_등록수정_품절표시_클릭,
          params: h => ({
            isSoldOut: h.target.checked
          }),
          children: a(H, {
            onClick: () => {
              u && s.open({
                icon: "icon-warning-circle",
                size: "medium",
                message: "재고가 없어서 품절을 해제할 수 없어요"
              })
            },
            children: a(ps, {
              feature: "isSoldOut",
              behaviour: "disable",
              children: a(ts, {
                checked: d,
                onChange: h => {
                  c(h.target.checked ? "SOLD_OUT" : "ON_SALE")
                },
                disabled: u
              })
            })
          })
        })
      }
    })
  })
}

function tVs({
               className: e
             }) {
  const {
    control: t
  } = ot();
  return a(Dre, {
    label: "세금",
    className: e,
    children: a(Tt, {
      name: "prices.0.isTaxFree",
      control: t,
      render: ({
                 field: {
                   value: n,
                   onChange: r
                 }
               }) => {
        const i = o => {
          r(o.target.value === "true")
        };
        return a(Ni, {
          capture: "onChange",
          schemaId: Wt.상품_등록수정_세금과세여부_선택,
          params: o => ({
            value: o.target.value === "true" ? "y" : "n"
          }),
          children: y(I.Horizontal, {
            children: [a(ps, {
              feature: "prices.0.isTaxFree",
              behaviour: "disable",
              children: a(ta, {
                inline: !0,
                label: "과세",
                value: "false",
                checked: !n,
                onChange: i
              })
            }), a(ps, {
              feature: "prices.0.isTaxFree",
              behaviour: "disable",
              children: a(ta, {
                inline: !0,
                label: "면세",
                value: "true",
                checked: n,
                onChange: i
              })
            })]
          })
        })
      }
    })
  })
}

function nVs({
               onCheckboxClick: e
             }) {
  const {
    watch: t,
    setValue: n
  } = ot(), r = t("prices.0.priceType"), i = t("prices.0.priceValue");
  return y(I.Horizontal, {
    align: "center",
    css: {
      height: 24
    },
    children: [a(W, {
      click: {
        schemaId: Wt.상품_등록수정_시가_클릭
      },
      children: a(ps, {
        feature: "prices.0.priceType",
        behaviour: "disable",
        children: a(NU, {
          checked: r === "VARIABLE",
          label: "매번 직접 입력할게요",
          onCheckedChange: o => {
            e(o ? "VARIABLE" : "FIXED")
          }
        })
      })
    }), a(ps, {
      feature: "prices.0.priceType",
      behaviour: "disable",
      children: a(NU, {
        checked: r === "UNIT",
        label: "무게에 따라 계산할게요",
        onCheckedChange: o => {
          o ? (e("UNIT"), n("prices.0.priceValue", Math.min(i, Kfr))) : e("FIXED")
        },
        css: {
          marginTop: 0
        }
      })
    })]
  })
}

function rVs({
               mode: e,
               isKioskCatalogItem: t = !1
             }) {
  var x;
  const {
    watch: n,
    getValues: r,
    setValue: i
  } = ot(), {
    hasEnabledFeatures: o
  } = Qw(), {
    barcodeUsage: s
  } = NKn(), {
    data: u
  } = X0(), l = GA(), [c, d, h] = qM(r("options").length > 0 || l.length > 0), {
    openConfirm: p
  } = gn(), f = n("prices.0.priceType"), g = n("options"), m = n("kioskEnabled"), v = f === "VARIABLE", b = async w => {
    if (w === "VARIABLE" && g.length > 0 && !await p({
      title: "가격을 매번 직접 입력할까요?",
      description: "이렇게 하면 설정한 옵션 정보가 사라져요.",
      closeOnDimmerClick: !0
    })) return;
    const A = {
      shouldValidate: !0,
      shouldDirty: !0
    };
    i("prices.0.priceType", w, A), i("kioskEnabled", !1, A), w === "VARIABLE" && i("options", [], A), h()
  }, C = m === !0 && o;
  return y(Q, {
    children: [y(VH, {
      css: {
        gridTemplateColumns: "160px 1fr",
        gap: "24px",
        marginTop: 24
      },
      children: [a(Zpr, {}), a(Qpr, {})]
    }), a(ba, {
      css: {
        marginTop: 30,
        marginBottom: 12
      }
    }), ((x = u == null ? void 0 : u.business) == null ? void 0 : x.type) === "SERVICE" ? y(Q, {
      children: [a(ZNs, {}), a(ce, {
        size: 12
      })]
    }) : null, a(INs, {}), a(ce, {
      size: 12
    }), a(ce, {
      size: 12
    }), C ? a(CNs, {}) : a(Gfr, {
      autoFocus: e === "create"
    }), a(ce, {
      size: 30
    }), a(DNs, {}), a(ce, {
      size: 30
    }), a(YNs, {}), a(ce, {
      size: 12
    }), a(nVs, {
      onCheckboxClick: b
    }), a(ce, {
      size: 20
    }), a("div", {
      children: c ? a(Oe, {
        children: a(xNs, {
          isKioskCatalogItem: t
        })
      }) : a(W, {
        click: {
          schemaId: Wt.상품_등록수정_옵션선택_버튼_클릭
        },
        children: a(Ye, {
          disabled: v,
          htmlType: "button",
          display: "block",
          variant: "weak",
          onClick: d,
          children: "옵션선택"
        })
      })
    }), a(ce, {
      size: 16
    }), a(KNs, {}), a(ce, {
      size: 16
    }), s ? a(Oe, {
      children: a(ANs, {
        referrer: `${Wt.상품_등록수정_다이얼로그}_${e}`
      })
    }) : null, a(ce, {
      size: 24
    }), m === !0 ? a(FNs, {}) : null, a(qNs, {
      mode: e
    }), a(eVs, {}), a(ba, {
      css: {
        margin: "12px 0px"
      }
    }), a(tVs, {
      css: {
        marginTop: 12
      }
    })]
  })
}

function b9() {
  const e = ht(),
    t = jfr();
  return K(n => yn.openAsync(({
                                isOpen: r,
                                close: i,
                                unmount: o
                              }) => a(Oe, {
    children: a(iVs, {
      open: r,
      onClose: () => {
        o()
      },
      onSubmit: s => {
        const u = te(n.mode).with("create", () => `"${s.title}" 상품을 등록했어요.`).with("edit", () => `"${s.title}" 상품을 수정했어요.`).exhaustive();
        e.open({
          icon: "icn-success-color",
          message: u
        }), i({
          type: n.mode,
          item: s
        })
      },
      onDelete: async s => {
        await t({
          menuItem: RRe(s),
          onNavigateToDeleteItem: () => o(),
          onDelete: () => {
            i({
              type: "delete",
              item: s
            })
          }
        })
      },
      onExited: () => {
        o()
      },
      options: n
    })
  })), [t, e])
}

function iVs({
               options: e,
               ...t
             }) {
  const {
    data: n
  } = iMe(), r = n.length > 0, i = Ra({
    withFavorite: !1,
    withPrepaidVoucher: !1
  }).find(o => e.mode === "edit" && o.catalogItem.id === e.itemId);
  return e.mode === "create" && r ? a(oVs, {
    options: e,
    ...t
  }) : e.mode === "edit" && i != null ? a(H0t, {
    item: i.catalogItem,
    options: e,
    ...t
  }) : e.mode === "edit" ? null : e.mode === "create" ? a(H0t, {
    options: e,
    ...t
  }) : null
}

function oVs(e) {
  const {
    options: t
  } = e;
  Ht(t.mode === "create"), urs();
  const n = j0t(t),
    [r, i] = q(null),
    o = async () => {
      try {
        const {
          data: {
            complete: s
          }
        } = await Fn.command({
          name: "catalog.before-add-health-check.request",
          data: {}
        }, {
          timeout: nVn
        });
        if (!s) {
          i(n);
          return
        }
        await Fn.emit({
          name: "catalog.event.request",
          data: {
            event: "before-add",
            initialValue: j0t(t)
          }
        })
      } catch {
        i(n)
      }
    };
  return Po(() => {
    o()
  }), Po(() => Fn.listen(s => {
    const {
      data: u,
      name: l
    } = s;
    if (l === "catalog.event.response") {
      if (u.complete && u.initialValue != null) {
        i(u.initialValue);
        return
      }
      i(n)
    }
  })), r == null ? null : a(H0t, {
    defaultItem: r,
    ...e
  })
}

function H0t({
               open: e,
               item: t,
               onClose: n,
               onExited: r,
               onSubmit: i,
               onDelete: o,
               options: s,
               defaultItem: u
             }) {
  const l = $o(),
    c = m7t(),
    {
      data: d
    } = rx(),
    h = (d == null ? void 0 : d.catalogManagement) === !0,
    p = s.isKioskCatalogItem === !0,
    f = yi({
      defaultValues: s.mode === "create" ? u ?? j0t(s) : j0(t),
      mode: "onChange"
    }),
    {
      isSubmitting: g,
      isValid: m
    } = f.formState,
    v = te(s.mode).with("create", () => "상품 추가").with("edit", () => "상품 수정").run(),
    b = te(s.mode).with("create", () => "등록").with("edit", () => "확인").run(),
    C = async T => {
      const B = await krr(T);
      return await Db(), B
    }, x = async (T, B) => {
      await c({
        before: T,
        after: B
      })
    }, w = async () => {
      t != null && (o == null || o(t))
    }, A = ht(), E = async T => {
      var B, S;
      try {
        switch (s.mode) {
          case "create":
            i(await C(T));
            break;
          case "edit":
            await x(j0(t), T), i(T);
            break
        }
        ye.log(Wt.상품_등록수정_CTA_클릭, {
          button: s.mode === "create" ? "등록" : "확인",
          itemTitle: T.title,
          categoryId: T.category.id,
          categoryTitle: T.category.title,
          priceValue: (B = T.prices[0]) == null ? void 0 : B.priceValue,
          isTaxFree: (S = T.prices[0]) == null ? void 0 : S.isTaxFree,
          position: T.position,
          color: T.color,
          optionIds: T.options.map(F => F.id),
          optionTitles: T.options.map(F => F.title),
          isSoldOut: T.state === "SOLD_OUT",
          tagList: T.labels.map(F => F.title),
          exposeYn: T.kioskEnabled
        })
      } catch (F) {
        if (Yn(F))
          if (F.errorCode === "4000") {
            const O = "중복되는 이름의 상품이 있어요!";
            A.open({
              icon: "icn-warning-color",
              message: O,
              position: "top"
            }), ye.log(Wt.상품_등록수정_중복되는_이름의_상품이_있어요_토스트, {
              message: O
            });
            return
          } else F.errorCode === "INVALID_BARCODE_LENGTH" && A.open({
            icon: "icn-warning-color",
            message: "바코드 길이를 초과하였습니다.",
            position: "top"
          });
        throw F
      }
    };
  return a(W, {
    screen: {
      schemaId: Wt.상품_등록수정_다이얼로그
    },
    params: {
      type: s.mode
    },
    children: y(xe, {
      open: e,
      onClose: n,
      onExited: r,
      css: {
        width: 764
      },
      children: [a(W, {
        click: {
          schemaId: Wt.상품_등록수정_X버튼_클릭
        },
        children: a(xe.CloseButton, {})
      }), a(xe.Title, {
        css: {
          flex: "none",
          padding: "40px 70px 20px"
        },
        children: y(I.Horizontal, {
          gutter: 12,
          align: "center",
          children: [a(ne, {
            typography: "h6",
            fontWeight: "semibold",
            color: _.grey800,
            children: v
          }), h && a(ne, {
            color: _.grey500,
            children: "본사에서만 상품을 수정할 수 있어요"
          })]
        })
      }), a(co, {
        ...f,
        children: y(Srr, {
          isAllowed: !h,
          allows: ["isSoldOut"],
          id: l,
          css: {
            position: "relative",
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column"
          },
          children: [a(xe.Scrollable, {
            css: {
              padding: "0 25px 0 70px",
              flex: 1
            },
            children: a("div", {
              css: {
                width: "100%",
                paddingRight: 10,
                overflowX: "hidden"
              },
              children: a(rVs, {
                mode: s.mode,
                isKioskCatalogItem: p
              })
            })
          }), y(xe.BottomActions, {
            css: {
              height: 106,
              padding: "22px 90px 22px 70px"
            },
            children: [!h && s.mode === "edit" ? a(Ye, {
              variant: "weak",
              type: "danger",
              size: "xlarge",
              onClick: w,
              children: "삭제"
            }) : null, y(I.Horizontal, {
              justify: "flex-end",
              gutter: 12,
              css: $e,
              children: [a(W, {
                click: {
                  schemaId: Wt.상품_등록수정_CTA_클릭
                },
                params: {
                  button: "취소"
                },
                children: a(Ye, {
                  htmlType: "button",
                  type: "default",
                  size: "xlarge",
                  onClick: n,
                  children: "취소"
                })
              }), a(Ye, {
                htmlType: "button",
                type: "primary",
                size: "xlarge",
                form: l,
                css: {
                  minWidth: 160
                },
                disabled: !m,
                loading: g,
                onClick: f.handleSubmit(E),
                children: b
              })]
            })]
          })]
        })
      })]
    })
  })
}

function j0t(e) {
  const {
    category: t,
    position: n,
    barcode: r
  } = e;
  return {
    id: -1,
    title: "",
    state: "ON_SALE",
    description: "",
    defaultPriceId: -1,
    labels: [],
    imageUrl: null,
    prices: [{
      id: -1,
      isDefault: !0,
      isTaxFree: !1,
      priceType: "FIXED",
      priceUnit: 1,
      priceValue: 0,
      barcode: r,
      sku: null,
      state: "ON_SALE",
      title: "기본",
      isStockable: !1,
      stockQuantity: null,
      draftInventory: {
        isStockable: !1,
        quantity: 0
      }
    }],
    options: [],
    category: t,
    position: n,
    kioskEnabled: !0,
    kioskTitle: ""
  }
}

function aVs() {
  const {
    open: e
  } = sn();
  return K(async t => new Promise((n, r) => {
    e(({
         isOpen: i,
         close: o
       }) => a(Oe, {
      children: a(sVs, {
        ...t,
        open: i,
        onClose: () => {
          r(new Kt), o()
        },
        onConfirm: s => {
          n(s), o()
        }
      })
    }))
  }), [e])
}

function sVs({
               isEditAvailable: e = !0,
               ...t
             }) {
  const {
    item: n,
    onClose: r
  } = t, {
    open: i
  } = Mve(), o = b9(), u = Ra({
    withFavorite: !1,
    withPrepaidVoucher: !1
  }).find(c => c.catalogItem.id === n.item.id), l = si(async () => {
    r(), await i({
      title: "이 상품에 설정된 옵션이 없어요",
      firstButton: {
        text: "옵션 설정하기",
        disabled: !e
      }
    }) === "FIRST" && o({
      mode: "edit",
      itemId: n.item.id
    })
  }, [r, i, o, n.item.id]);
  return ie(() => {
    (u == null ? void 0 : u.catalogItem.options.length) === 0 && l()
  }, [u == null ? void 0 : u.catalogItem.options.length, l]), (u == null ? void 0 : u.catalogItem.options.length) === 0 ? null : a(uVs, {
    ...t
  })
}

function uVs({
               open: e,
               title: t,
               ctaTitle: n,
               item: r,
               onClose: i,
               onConfirm: o
             }) {
  const s = ht(),
    u = Trr(r.item.id),
    [l, c] = q(r),
    d = Gk(l);
  return y(xe, {
    open: e,
    onClose: i,
    children: [a(xe.Title, {
      css: pte,
      children: t
    }), a(xe.CloseButton, {}), a(xe.Scrollable, {
      css: {
        flex: 1,
        overflowY: "hidden"
      },
      buttonGroupStyle: {
        right: 34,
        top: 70
      },
      children: a(Jpr, {
        item: l,
        onChange: c,
        css: {
          padding: "50px 48px 50px 70px"
        }
      })
    }), y(xe.BottomActions, {
      css: {
        height: 138,
        padding: "0 71px 0 58px"
      },
      children: [y(I.Vertical, {
        gutter: 6,
        css: {
          minWidth: 0,
          flex: "1 1 auto"
        },
        children: [a(ee, {
          typography: "st5",
          fontWeight: "bold",
          color: _.grey800,
          ellipsisAfterLines: 1,
          children: l.item.title
        }), y(ee, {
          typography: "st5",
          fontWeight: "regular",
          color: _.grey800,
          children: [fe(d), "원"]
        })]
      }), y(I.Horizontal, {
        align: "center",
        gutter: 12,
        children: [a(yS, {
          size: "big",
          value: l.quantity,
          border: !0,
          max: 999,
          onChange: (h, p) => {
            c(f => ({
              ...f,
              quantity: p
            }))
          }
        }), a(Ye, {
          type: "primary",
          size: "xlarge",
          disabled: eMn(u, l.optionChoices),
          onClick: () => {
            if (!ODe(l)) {
              s.open({
                icon: "icn-warning-color",
                message: "마이너스 옵션 가격은 상품 가격을 넘을 수 없습니다",
                position: "top"
              });
              return
            }
            o(l)
          },
          css: {
            minWidth: 160
          },
          children: n
        })]
      })]
    })]
  })
}
const lVs = Ck({
    key: "ordering.draftOrder",
    get: ({
            snapshot: e
          }) => ({
                   get: t
                 }) => t(Ko({
      snapshot: e
    })).previousOrder,
    set: ({
            snapshot: e
          }) => ({
                   set: t
                 }, n) => {
      n instanceof n7 ? t(Ko({
        snapshot: e
      }), n) : t(Ko({
        snapshot: e
      }), r => mn(r, i => {
        i.previousOrder = n
      }))
    }
  }),
  Yq = Ck({
    key: "ordering.draftOrder",
    get: ({
            snapshot: e
          }) => ({
                   get: t
                 }) => t(Ko({
      snapshot: e
    })).previousDraftOrder,
    set: ({
            snapshot: e
          }) => ({
                   set: t
                 }, n) => {
      n instanceof n7 ? t(Ko({
        snapshot: e
      }), n) : t(Ko({
        snapshot: e
      }), r => mn(r, i => {
        i.previousDraftOrder = n
      }))
    }
  }),
  cVs = Ck({
    key: "ordering.draftOrder.lineItems[n]",
    get: ({
            itemKey: e,
            snapshot: t
          }) => ({
                   get: n
                 }) => {
      const r = n(Ko({
        snapshot: t
      })).previousDraftOrder.lineItems.find(i => i.key === e);
      return Ht(r != null, `"${e}"에 해당하는 주문항목이 없어요.`), r
    },
    set: ({
            itemKey: e,
            snapshot: t
          }) => ({
                   set: n
                 }, r) => {
      if (r instanceof n7) {
        n(Ko({
          snapshot: t
        }), r);
        return
      }
      n(Ko({
        snapshot: t
      }), i => mn(i, o => {
        Ht(o.previousDraftOrder != null, "이전 주문이 있는 상태에서 사용해주세요.");
        const s = o.previousDraftOrder.lineItems.findIndex(u => u.key === e);
        s > -1 && (o.previousDraftOrder.lineItems[s] = r)
      }))
    },
    cachePolicy_UNSTABLE: {
      eviction: "lru",
      maxSize: 50
    }
  });

function dVs({
               snapshot: e
             }) {
  const t = SX(lVs({
      snapshot: e
    })),
    n = SX(Yq({
      snapshot: e
    })),
    r = Aa(({
              set: c
            }) => (d, h) => {
      c(cVs({
        itemKey: d.key,
        snapshot: e
      }), p => mn(p, f => {
        f.quantity = typeof h == "function" ? h(f.quantity) : h
      }))
    }, [e]),
    i = Aa(({
              set: c
            }) => d => {
      const h = o8();
      c(Ko({
        snapshot: e
      }), p => mn(p, f => {
        const g = Yhe(f.draftOrder, {
          ...d,
          quantity: 1,
          appliedDiscounts: [],
          key: h
        });
        f.draftOrder = g, f.activatedItemKey = h
      }))
    }, [e]),
    o = Aa(({
              set: c,
              snapshot: {
                getLoadable: d
              }
            }) => h => {
      const {
        lineItems: p
      } = d(Yq({
        snapshot: e
      })).getValue(), f = p.findIndex(g => g.key === h.key);
      c(Yq({
        snapshot: e
      }), g => sMn(g, h.key)), c(Ko({
        snapshot: e
      }), g => mn(g, m => {
        const v = m.previousDraftOrder.lineItems[f];
        v != null && (m.activatedItemKey = v.key)
      }))
    }, [e]),
    s = Aa(({
              set: c
            }) => d => {
      c(Yq({
        snapshot: e
      }), h => {
        const p = h.discounts[d];
        return p != null && M2(p) && (h = wMn(h)), Bwt(h, d)
      })
    }, [e]),
    u = Aa(({
              set: c
            }) => (d, h) => {
      c(Yq({
        snapshot: e
      }), p => Swt(p, d.key, h))
    }, [e]),
    l = Aa(({
              set: c
            }) => (d, h) => {
      if (!Dwt(d, h)) throw new Error("할인금액을 다시 확인해주세요");
      c(Yq({
        snapshot: e
      }), p => Twt(p, d.key, h))
    }, [e]);
  return {
    previousDraftOrder: n,
    previousOrder: t,
    updatePreviousItemQuantity: r,
    addPreviousItemToDraftOrder: i,
    deletePreviousOrderDiscount: s,
    deletePreviousOrderItemDiscount: u,
    deletePreviousDraftOrderItem: o,
    addPreviousOrderItemDiscounts: l
  }
}
