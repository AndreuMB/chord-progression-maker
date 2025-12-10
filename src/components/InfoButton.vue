<script setup lang="ts"></script>
<template>
  <div>
    <!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->
    <button
      command="show-modal"
      commandfor="dialog"
      class="bg-transparent! cursor-default! border-0!"
    >
      <i
        class="pi pi-info-circle text-primary! hover:text-primary-light! cursor-pointer! bg-secondary p-[2px] rounded-2xl"
      ></i>
    </button>
    <el-dialog>
      <dialog
        id="dialog"
        aria-labelledby="dialog-title"
        class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
      >
        <el-dialog-backdrop
          class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        ></el-dialog-backdrop>

        <div
          tabindex="0"
          class="flex min-h-full text-primary items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
          <el-dialog-panel class="relative rounded outline -outline-offset-1 max-w-lg">
            <div class="bg-secondary p-5">
              <div class="flex gap-2 items-center">
                <i class="pi pi-info-circle"></i>
                <h3 class="text-base font-semibold">How it is done?</h3>
              </div>
              <div class="mt-2 ml-2 text-left text-sm flex flex-col gap-2">
                <div>
                  When you select an scale it gets the seven notes from it and make the chords. With
                  this chords it makes a 4 chord progression. <br />After this depend if you
                  selected Major or minor scale it works different.
                </div>
                <ul>
                  <li class="mb-2">
                    <h4 class="font-bold!">MAJOR</h4>
                    <ol class="list-decimal px-6">
                      <li>Start with grade I from the scale.</li>
                      <li>
                        The second and third chords will be selected randomly between the ii, iii,
                        and vi grade.
                      </li>
                      <li>Finish with the IV or V chord.</li>
                    </ol>
                  </li>

                  <li>
                    <h4 class="font-bold!">minor</h4>
                    <ol class="list-decimal px-6">
                      <li>Start with grade i or VI from the scale.</li>
                      <li>
                        The second, third and fourth chords will be selected randomly between the
                        III, iv, v, V (this one is not in the scale but still fits chord
                        progressions) and VII grade.
                      </li>
                    </ol>
                  </li>
                </ul>
                Its very simple you can try to do it yourself!
              </div>
            </div>
            <button
              command="close"
              commandfor="dialog"
              class="bg-transparent! cursor-default! border-0! absolute top-2 right-2"
            >
              <i class="pi pi-times text-primary hover:text-primary-light cursor-pointer!"></i>
            </button>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  </div>
</template>

<style scoped></style>
